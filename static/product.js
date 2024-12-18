window.onload = function() {
    const productName = sessionStorage.getItem('productName');
    const productImage = sessionStorage.getItem('productImage');
    const productPrice = sessionStorage.getItem('productPrice');
    // Hiển thị dữ liệu lên trang
    document.getElementById('product-name').innerText = productName;
    img=document.getElementById('product-image');
    img.src = productImage;
    document.getElementById('product-price').innerText = productPrice;
};
function goBack(){
    window.history.back();
}
let quantity=1;
function changeQuantity(change) {
    change = parseInt(change);
    quantity=parseInt(quantity);
    quantity+=change;
    if (quantity < 1) {
        quantity = 1; // Không cho phép số lượng âm
    }
    document.getElementById('quantity').innerText = quantity;
}
