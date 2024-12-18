window.onload = function() {
    const productName = sessionStorage.getItem('productName');
    const productImage = sessionStorage.getItem('productImage');
    const productPrice = sessionStorage.getItem('productPrice');
    const productQuantity = sessionStorage.getItem('productQuantity') || 1;
    // Hiển thị dữ liệu lên trang
    document.getElementById('product-name').innerText = productName;
    img=document.getElementById('product-image');
    img.src = productImage;
    document.getElementById('product-price').innerText = productPrice;
    quant=document.getElementById('quantity');
    quant.innerText=productQuantity;
};
function goBack(){
    // Đánh dấu reload trên home bằng sessionStorage
    sessionStorage.setItem('reloadHome', 'true');
    window.history.back();
}
function changeQuantity(delta) {
    const quantitySpan = document.getElementById('quantity');
    let quantity = parseInt(quantitySpan.innerText);

    // Cập nhật số lượng
    quantity += delta;
    if (quantity < 1) quantity = 1;

    // Hiển thị số lượng mới
    quantitySpan.innerText = quantity;

    // Lưu lại vào sessionStorage
    const productName = sessionStorage.getItem('productName');
    sessionStorage.setItem(`${productName}-quantity`, quantity);
    sessionStorage.setItem('productQuantity', quantity);
}