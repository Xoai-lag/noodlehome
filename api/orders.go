package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
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

	// Phản hồi lại client
	c.JSON(http.StatusOK, gin.H{
		"message": "Thanh toán thành công",
		"orderId": orderID,
	})
}
