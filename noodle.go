package main

import (
	"github.com/gin-gonic/gin"
	"noodlehome/api"
)

func main() {
	r := gin.Default()
	r.Static("/static", "./static")
	r.LoadHTMLGlob("templates/*")

	r.POST("/login", api.LoginHandler)
	r.Run()
}
