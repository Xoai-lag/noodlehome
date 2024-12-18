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
});
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