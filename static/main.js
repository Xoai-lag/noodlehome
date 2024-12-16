
function jsloginhandler(e) {
    e.preventDefault(); // Ngừng hành động mặc định của form

    const email = document.getElementById("emaillogin").value;
    const password = document.getElementById("passwordlogin").value;

    const user = {
        Email_u: email,
        Password_u: password
    };

    console.log("User data:", user); // Kiểm tra đối tượng user

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Đảm bảo header Content-Type là application/json
        },
        body: JSON.stringify(user), // Chuyển đổi đối tượng JavaScript thành JSON
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Login successful") {
                alert("Đăng nhập thành công");
                window.location.href = "/home";
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error("Lỗi khi đăng nhập:", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        });
}
