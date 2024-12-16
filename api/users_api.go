package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"noodlehome/models"
	"strconv"
)

func LoginHandler(c *gin.Context) {
	var user models.Users
	// Kiểm tra việc phân tích dữ liệu JSON
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}

	// Load user list từ JSON file
	var listuser []models.Users
	if err := models.LoadUsersFromJson("utils/Users.json", &listuser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Kiểm tra người dùng
	for _, existingUser := range listuser {
		if existingUser.Email_u == user.Email_u && existingUser.Password_u == user.Password_u {
			c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
			return
		}
	}
	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
}

func RegisterHandler(c *gin.Context) {
	var usertemp models.Users
	if err := c.ShouldBind(&usertemp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var listuser []models.Users
	if err := models.LoadUsersFromJson("utils/Users.json", &listuser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	for _, user := range listuser {
		if user.Email_u == usertemp.Email_u {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email already exists"})
			return
		}
	}
	usertemp.Id_u = strconv.Itoa(len(listuser))
	listuser = append(listuser, usertemp)
	if err := models.SaveUsersToJson("utils/Users.json", listuser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Registration successful"})
}
