// Hàm xử lý khi đăng nhập
function jsloginhandler(e) {
    e.preventDefault(); // Ngừng hành động mặc định của form

    const email = document.getElementById("emaillogin").value;
    const password = document.getElementById("passwordlogin").value;

    const user = {
        Email_u: email,
        Password_u: password
    };

    // Gửi dữ liệu lên server qua API login
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Đảm bảo header Content-Type là application/json
        },
        body: JSON.stringify(user), // Chuyển đối tượng JavaScript thành JSON
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Login successful") {
                // Sau khi đăng nhập thành công, kiểm tra session
                fetch("/checkcookie", { method: "GET" })
                    .then(sessionResponse => sessionResponse.json())
                    .then(sessionData => {
                        if (sessionData.message === "Session valid") {
                            // Chuyển hướng đến trang home
                            document.location.href = "/home";
                        } else {
                            alert("Please login first");
                        }
                    })
                    .catch(error => {
                        console.error("Lỗi khi kiểm tra session:", error);
                        alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
                    });
            } else {
                alert(data.error); // Hiển thị lỗi nếu đăng nhập thất bại
            }
        })
        .catch(error => {
            console.error("Lỗi khi đăng nhập:", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        });
}

// Lắng nghe sự kiện submit của form đăng nhập
document.getElementById("loginForm").addEventListener("submit", jsloginhandler);
