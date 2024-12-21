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
}
document.getElementById("finish").addEventListener("click", function () {
    // Lấy dữ liệu từ giỏ hàng
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.");
        return;
    }

    // Tính tổng tiền
    let total = cart.reduce((sum, item) => {
        return sum + parseInt(item.price.replace('đ', '').replace('.', '')) * item.quantity;
    }, 0);

    // Lấy email của user từ API `/emailuserinfo`
    fetch('/emailuserinfo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) throw new Error("Không thể lấy thông tin người dùng.");
            return response.json();
        })
        .then(data => {
            const email = data.email;
            // Chuẩn bị dữ liệu để gửi lên server
            const checkoutData = {
                cart: cart,
                total: total,
                email: email,
            };

            // Gửi dữ liệu thanh toán về backend
            return fetch('/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkoutData)
            });
        })
        .then(response => {
            if (!response.ok) throw new Error("Thanh toán thất bại.");
            return response.json();
        })
        .then(data => {
            // Xử lý khi thanh toán thành công
            alert("Thanh toán thành công! Mã đơn hàng: " + data.orderId);

            // Xóa giỏ hàng
            sessionStorage.removeItem("cart");

            // Chuyển hướng về trang xác nhận đơn hàng
            window.location.href = "/home";
        })
        .catch(error => {
            console.error("Lỗi thanh toán:", error);
            alert("Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.");
        });
});