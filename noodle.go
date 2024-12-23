package main

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"net/http"
	"noodlehome/api"
)

func main() {
	r := gin.Default()
	r.Static("/static", "./static")
	store := cookie.NewStore([]byte("mysecretkey"))
	r.Use(sessions.Sessions("mysession", store))
	r.GET("/login", func(c *gin.Context) {
		c.HTML(http.StatusOK, "login.html", nil)
	})
	r.GET("/register", func(c *gin.Context) {
		c.HTML(http.StatusOK, "register.html", nil)
	})
	r.GET("/home", func(c *gin.Context) {
		c.HTML(http.StatusOK, "home.html", nil)
	})
	r.GET("/product", func(c *gin.Context) {
		c.HTML(http.StatusOK, "product.html", nil)
	})
	r.GET("/payment", func(c *gin.Context) {
		c.HTML(http.StatusOK, "payment.html", nil)
	})
	r.GET("/emailuserinfo", api.EmailUserInfo)
	r.GET("/checkcookie", api.CheckCookieuser)
	r.POST("/login", api.LoginHandler)
	r.POST("/register", api.RegisterHandler)
	r.POST("/checkout", api.CheckoutHandler)
	r.LoadHTMLGlob("templates/*.html")
	r.Run()
}
