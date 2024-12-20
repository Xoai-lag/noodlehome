window.addEventListener('pageshow', function() {
    // Kiểm tra nếu cần reload
    if (sessionStorage.getItem('reloadHome') === 'true') {
        // Xóa cờ reload
        sessionStorage.removeItem('reloadHome');
        document.querySelectorAll('.home-product-item').forEach(item => {
            const productName = item.getAttribute('data-product-name');
            const quantity = sessionStorage.getItem(`${productName}-quantity`) || 0;
            const quantitySpan = item.querySelector('.quantity');
            quantitySpan.innerText = quantity;
        });
    }
    loadCart();
});
function loadCart() {
    const cartContainer = document.querySelector(".cart-content");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const cartTotalElement = document.querySelector(".cart-total");

    // Lấy dữ liệu từ sessionStorage
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Reset nội dung cũ để tránh nhân đôi
    cartContainer.innerHTML = "";
    let total = 0;

    // Xử lý giỏ hàng trống hoặc có sản phẩm
    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
        cartTotalElement.innerText = "Tổng: 0đ";
    } else {
        emptyCartMessage.style.display = "none";
        cart.forEach(item => {
            total += parseInt(item.price.replace('đ', '').replace('.', '')) * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price} x ${item.quantity}</p>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        // Hiển thị tổng tiền
        cartTotalElement.innerText = `Tổng: ${total.toLocaleString()}đ`;
    }
}
function changeQuantity(event, action) {
    event.stopPropagation(); // Ngăn sự kiện click lan tỏa lên div cha
    const quantitySpan = event.target.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantitySpan.innerText);

    // Cập nhật số lượng
    if (action === 'plus') {
        quantity += 1;
    } else if (action === 'minus' && quantity > 0) {
        quantity -= 1;
    }

    // Hiển thị số lượng cập nhật
    quantitySpan.innerText = quantity;

    // Lưu số lượng vào sessionStorage
    const productItem = event.target.closest('.home-product-item');
    const productName = productItem.getAttribute('data-product-name');
    sessionStorage.setItem(`${productName}-quantity`, quantity);
}

function selectProduct(name, image, price) {
    // Lấy số lượng từ sessionStorage
    const quantity = sessionStorage.getItem(`${name}-quantity`) || 1;

    // Lưu thông tin vào sessionStorage
    sessionStorage.setItem('productName', name);
    sessionStorage.setItem('productImage', image);
    sessionStorage.setItem('productPrice', price);
    sessionStorage.setItem('productQuantity', quantity);

    // Chuyển đến trang chi tiết sản phẩm
    window.location.href = '/product';
}