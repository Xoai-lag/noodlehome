window.addEventListener('pageshow', function() {
    // Kiểm tra nếu cần reload
    if (sessionStorage.getItem('reloadHome') === 'true') {
        // Xóa cờ reload
        sessionStorage.removeItem('reloadHome');
        document.querySelectorAll('.home-product-item').forEach(item => {
            const productId = item.getAttribute('data-id');
            const quantity = sessionStorage.getItem(`${productId}-quantity`) || 0;
            const quantitySpan = item.querySelector('.quantity');
            quantitySpan.innerText = quantity; // Hiển thị số lượng từ sessionStorage
        });
        console.log("Session Storage:", sessionStorage.getItem("cart"));
        loadCart();
    }
});
function loadCart() {
    const cartContainer = document.querySelector(".container_list");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const cartTotalElement = document.querySelector(".cart-total");

// Lấy dữ liệu từ sessionStorage
    let cart = [];
    try {
        cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    } catch (error) {
        console.error("Failed to parse cart data:", error);
        cart = [];
    }
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
            cartItem.className="empty-cart"
            cartItem.id="empty-cart-message"
            cartItem.innerHTML = `
                <div class="cart-item__image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item__details">
                    <h4 class="cart-item__name">${item.name}</h4>
                    <p class="cart-item__price">${item.price} x ${item.quantity}</p>
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
    const productId = productItem.getAttribute('data-id'); // Lấy ID món ăn
    sessionStorage.setItem(`${productId}-quantity`, quantity); // Lưu theo ID
    sessionStorage.setItem(`${productName}-id`, productId); // Đảm bảo tên gắn với ID
}

function selectProduct(name, image, price) {
    // Lấy số lượng từ sessionStorage
    const productItem = document.querySelector(`[data-product-name="${name}"]`);
    const productId = productItem.getAttribute('data-id'); // Lấy ID món ăn
    const quantity = sessionStorage.getItem(`${productId}-quantity`) || 1;

    // Lưu thông tin vào sessionStorage
    sessionStorage.setItem('productId', productId); // Lưu ID món ăn
    sessionStorage.setItem('productName', name);
    sessionStorage.setItem('productImage', image);
    sessionStorage.setItem('productPrice', price);
    sessionStorage.setItem('productQuantity', quantity);


    // Chuyển đến trang chi tiết sản phẩm
    window.location.href = '/product';
}

