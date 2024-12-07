package main

import "github.com/gin-gonic/gin"

func main() {
	//tao router
	r := gin.Default()
	//cung cap ca file tinh css, js ...
	r.Static("/static", "./static")
	//router chinh hien thi giao dien dang nhap
	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "register.html", nil)
	})
	//load cac file html trong thu muc static
	r.LoadHTMLGlob("templates/*")
	port := ":8080"
	println("Sever dang chay tai http://localhost" + port)
	if err := r.Run(port); err != nil {
		panic(err)
	}
}
