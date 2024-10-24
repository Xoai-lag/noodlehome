package main

import (
	"net/http"
)

func main() {
	// Tạo một file server để phục vụ các file tĩnh từ thư mục "./static"
	fs := http.FileServer(http.Dir("./static"))

	// Đăng ký file server cho đường dẫn gốc ("/")
	// Tức là mọi yêu cầu đến http://localhost:8080/ sẽ được xử lý bởi fs
	http.Handle("/", fs)

	// Khởi động server và lắng nghe trên cổng 8080
	// Tham số nil sử dụng http.DefaultServeMux cho việc xử lý các yêu cầu
	http.ListenAndServe(":8080", nil)
}
