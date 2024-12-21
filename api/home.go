package api

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CheckCookieuser(c *gin.Context) {
	session := sessions.Default(c)
	useremail := session.Get("user_email")
	if useremail == nil {
		// Nếu session không hợp lệ, trả về lỗi yêu cầu đăng nhập
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Please login first"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Session valid"})
}
func EmailUserInfo(c *gin.Context) {
	session := sessions.Default(c)
	useremail := session.Get("user_email")
	if useremail == nil {
		c.JSON(http.StatusUnauthorized, nil)
		return
	}
	c.JSON(http.StatusOK, gin.H{"email": useremail})
}
