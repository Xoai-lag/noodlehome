package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"noodlehome/models"
	"strconv"
)

func LoginHandler(c *gin.Context) {
	var usertemp models.Users
	if err := c.ShouldBindJSON(&usertemp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var listuser []models.Users
	if err := models.LoadUsersFromJson("utils/Users.json", &listuser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	for _, user := range listuser {
		if user.Email_u == usertemp.Email_u && user.Password_u == usertemp.Password_u {
			c.JSON(http.StatusOK, gin.H{"message": "Login successful"}) //cho thay home vao
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
	usertemp.Id_u = strconv.Itoa(len(listuser))
	usertemp.Full_name_u = "User" + usertemp.Id_u
	for _, user := range listuser {
		if user.Email_u == usertemp.Email_u {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email already exists"})
			return
		}
	}
	listuser = append(listuser, usertemp)
	if err := models.SaveUsersToJson("utils/Users.json", listuser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}
