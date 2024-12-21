package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"noodlehome/models"
	"time"
)

type CheckoutRequest struct {
	Cart  []CartItem `json:"cart"`  // Danh sách sản phẩm trong giỏ hàng
	Total int        `json:"total"` // Tổng tiền
	Email string     `json:"email"` // Email người dùng
}
type CartItem struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Price    string `json:"price"`
	Quantity int    `json:"quantity"`
}

func CheckoutHandler(c *gin.Context) {
	var req CheckoutRequest

	// Parse JSON từ request body
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Kiểm tra dữ liệu
	if len(req.Cart) == 0 || req.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Giỏ hàng hoặc email không hợp lệ"})
		return
	}

	now := time.Now()
	orderID := fmt.Sprintf("DH%02d%02d%02d", now.Hour(), now.Minute(), now.Second())

	var id_user string
	var listuser []models.Users
	if err := models.LoadUsersFromJson("utils/Users.json", &listuser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	for _, user := range listuser {
		if user.Email_u == req.Email {
			id_user = user.Id_u
		}
	}
	// Tạo đối tượng Order
	order := models.Oders{
		Oder_id:          orderID,
		User_id:          id_user,
		Oder_date:        time.Now(),
		Oder_status:      "Pending",
		Oder_Total_Price: fmt.Sprintf("%d", req.Total),
	}

	// Tạo danh sách Items
	var items []models.Items
	for _, cartItem := range req.Cart {
		item := models.Items{
			Item_id:       fmt.Sprintf("IT%s", cartItem.ID),
			Oder_id:       orderID,
			Product_id:    cartItem.ID,
			Item_quantity: fmt.Sprintf("%d", cartItem.Quantity),
			Item_price:    cartItem.Price,
		}
		items = append(items, item)
	}

	// Tạo thông tin Payment
	payment := models.Payments{
		Payment_id:     fmt.Sprintf("PM%s", orderID),
		Oder_id:        orderID,
		Payment_date:   time.Now(),
		Payment_amount: fmt.Sprintf("%d", req.Total),
		Payment_method: "Cash",
	}

	{
		var listOrders []models.Oders
		err := models.LoadOrdersFromJson("utils/Orders.json", &listOrders)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		listOrders = append(listOrders, order)
		// Lưu dữ liệu vào tệp JSON hoặc cơ sở dữ liệu
		if err := models.SaveOrdersToJson("utils/Orders.json", listOrders); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save items"})
		}

	}
	{
		var listOrders_Item []models.Items
		err := models.LoadOrders_ItemFromJson("utils/Order_Item.json", &listOrders_Item)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		combined := append(listOrders_Item, items...)
		if err := models.SaveOrders_ItemToJson("utils/Order_Item.json", combined); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save items"})
			return
		}
	}

	{
		var listpayment []models.Payments
		err := models.LoadPaymentFormJson("utils/Payment.json", &listpayment)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		listpayment = append(listpayment, payment)
		if err := models.SavePaymentToJson("utils/Payment.json", listpayment); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save payment"})
			return
		}
	}

	// Phản hồi lại client
	c.JSON(http.StatusOK, gin.H{
		"message": "Thanh toán thành công",
		"orderId": orderID,
	})
}
