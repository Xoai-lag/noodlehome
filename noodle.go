package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"noodlehome/api"
)

func main() {
	r := gin.Default()
	r.Static("/static", "./static")
	r.GET("/login", func(c *gin.Context) {
		c.HTML(http.StatusOK, "login.html", nil)
	})
	r.GET("/register", func(c *gin.Context) {
		c.HTML(http.StatusOK, "register.html", nil)
	})
	r.GET("/home", func(c *gin.Context) {
		c.HTML(http.StatusOK, "home.html", nil)
	})
	r.POST("/login", api.LoginHandler)
	r.POST("/register", api.RegisterHandler)
	r.LoadHTMLGlob("templates/*.html")
	r.Run()
}
