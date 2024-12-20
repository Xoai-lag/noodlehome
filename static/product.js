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
    const  addToCartButton =document.getElementById("add-to-cart");
    addToCartButton.addEventListener("click", addToCart);
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
// Lấy thông tin từ trang và thêm vào giỏ hàng
function addToCart() {
    alert("Ham nay da duoc goi");
    // Lấy dữ liệu sản phẩm
    const productName = document.getElementById("product-name").innerText;
    const productPrice = document.getElementById("product-price").innerText;
    const productImage = document.getElementById("product-image").src;
    const quantity = parseInt(document.getElementById("quantity").innerText);

    // Tạo object món ăn
    const newItem = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity
    };

    // Lấy giỏ hàng từ sessionStorage hoặc tạo giỏ hàng mới
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Kiểm tra xem sản phẩm đã tồn tại chưa, nếu có tăng số lượng
    const existingItem = cart.find(item => item.name === newItem.name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push(newItem);
    }

    // Lưu giỏ hàng vào sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Thông báo cho người dùng
    alert("Đã thêm vào giỏ hàng!");
}
