function selectProduct(name, image, price) {
    // Lưu thông tin sản phẩm vào sessionStorage
    sessionStorage.setItem('productName', name);
    sessionStorage.setItem('productImage', image);
    sessionStorage.setItem('productPrice', price);

    // Chuyển hướng đến trang product.html
    window.location.href = '/product';
}
