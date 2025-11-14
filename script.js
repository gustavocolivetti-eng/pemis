
let cart = [];
function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}
function renderCart() {
    const list = document.getElementById("cart-list");
    list.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        const li = document.createElement("li");
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        list.appendChild(li);
    });
    document.getElementById("total").textContent = total.toFixed(2);
}
