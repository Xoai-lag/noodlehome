window.onload = function() {
    const divform=document.querySelector('.summary');
    // Lấy dữ liệu từ sessionStorage
    let cart = [];
    try {
        cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    } catch (error) {
        console.error("Failed to parse cart data:", error);
        cart = [];
    }
    console.log(cart);
    let total = 0;
    // Xử lý giỏ hàng trống hoặc có sản phẩm
    if (cart.length !== 0) {
        divform.innerHTML = "";
        cart.forEach(item => {
            total += parseInt(item.price.replace('đ', '').replace('.', '')) * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.className="item-cart-payment";
            cartItem.innerHTML = `
                <div class="item-for-payment">
                    <h6 class="name-item">${item.name}</h6>
                    <p class="price-item">${item.price} x ${item.quantity}</p>
                </div>
            `;
            divform.appendChild(cartItem);
        });
        // Hiển thị tổng tiền
        const totalDiv = document.createElement("div");
        totalDiv.className = "total-payment";
        totalDiv.innerHTML = `<strong>Tổng cộng:</strong> ${total.toLocaleString()}đ`;
        divform.appendChild(totalDiv);
    } else {
        // Giỏ hàng trống
        divform.innerHTML = "<p>Giỏ hàng của bạn đang trống!</p>";
    }
};
function goback(){
    window.history.back();
}document.getElementById("finish").addEventListener("click", function () {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.");
        return;
    }

    const total = cart.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''), 10); // Loại bỏ ký tự không phải số
        if (isNaN(price)) {
            console.error("Giá trị không hợp lệ trong giỏ hàng:", item.price);
            return sum; // Bỏ qua sản phẩm này
        }
        return sum + price * item.quantity;
    }, 0);

    // Kiểm tra lại dữ liệu trước khi gửi lên server
    console.log("Giỏ hàng:", cart);
    console.log("Tổng tiền:", total);

    // Lấy email của user từ API `/emailuserinfo`
    fetch('/emailuserinfo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                console.error("Lỗi khi lấy thông tin người dùng:", response);
                throw new Error("Không thể lấy thông tin người dùng.");
            }
            return response.json();
        })
        .then(data => {
            const email = data.email;
            if (!email) {
                throw new Error("Không tìm thấy email người dùng.");
            }

            // Chuẩn bị dữ liệu để gửi lên server
            const checkoutData = {
                cart: cart,
                total: total,
                email: email,
            };

            console.log("Dữ liệu thanh toán gửi lên server:", checkoutData);

            // Gửi dữ liệu thanh toán về backend
            return fetch('http://localhost:8080/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkoutData)
            });
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    console.error("Lỗi khi thanh toán:", errData);
                    throw new Error(errData.error || "Thanh toán thất bại.");
                });
            }
            return response.json();
        })
        .then(data => {
            alert("Thanh toán thành công! Mã đơn hàng: " + data.orderId);
            sessionStorage.removeItem("cart");
            document.location.href = "/home";
        })
        .catch(error => {
            console.error("Lỗi thanh toán:", error.message);
            alert(error.message || "Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.");
        });
});

