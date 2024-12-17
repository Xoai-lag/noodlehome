// Lấy các phần tử HTML cần thiết
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

// Object lưu tạm dữ liệu từ Form 1
let formData = {};

function checkForm1Completion(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("cfpassword").value;
    // Kiểm tra tất cả các trường có giá trị
    if (email && password && confirm){
        // Nếu tất cả các trường có giá trị, kích hoạt nút "Next"
        document.getElementById("nextBtn").disabled = false;
    } else {
        // Nếu có trường còn thiếu, vô hiệu hóa nút "Next"
        document.getElementById("nextBtn").disabled = true;
    }
}
document.getElementById("email").addEventListener("input", checkForm1Completion);
document.getElementById("password").addEventListener("input", checkForm1Completion);
document.getElementById("cfpassword").addEventListener("input", checkForm1Completion);
// Xử lý sự kiện khi nhấn nút "Next"
nextBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("cfpassword").value;

    // Kiểm tra mật khẩu khớp nhau
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Lưu dữ liệu vào object tạm thời
    formData = {
        email_u: email,
        password_u: password
    };

    // Ẩn form1 và hiện form2
    form1.classList.add("hidden");
    form2.classList.remove("hidden");
});

// Xử lý sự kiện khi nhấn nút "Back"
backBtn.addEventListener("click", () => {
    // Hiện lại form1 và ẩn form2
    form2.classList.add("hidden");
    form1.classList.remove("hidden");
});

// Xử lý sự kiện khi submit Form 2
form2.addEventListener("submit", (e) => {
    e.preventDefault();

    // Lấy dữ liệu tên từ Form 2
    const name = document.getElementById("name").value;

    // Kết hợp dữ liệu từ Form 1 và Form 2
    const user = {
        full_name_u: name,
        ...formData // Kết hợp dữ liệu đã lưu trước đó
    };

    // Gửi dữ liệu lên server
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Registration successful") {
                alert("Tạo tài khoản thành công!");
                window.location.href = "/login";
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error("Lỗi khi đăng ký:", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        });
});
