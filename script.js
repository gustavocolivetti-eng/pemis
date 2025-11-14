
let cart = [];

// Adicionar produto ao carrinho
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

// Atualiza a lista e total do carrinho
function updateCart() {
    const cartList = document.getElementById("cart-list");
    const totalEl = document.getElementById("total");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} 
            <button onclick="removeItem(${index})">Remover</button>`;
        cartList.appendChild(li);
    });

    totalEl.textContent = total.toFixed(2);
}

// Remover item
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Finalizar pedido
function finalizarPedido() {
    if (cart.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    const cliente = prompt("Digite seu nome:");
    if (!cliente) return;

    const itens = cart.map(p => p.name);

    fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, itens })
    })
    .then(res => res.json())
    .then(resposta => {
        alert(`Pedido recebido! ID: ${resposta.pedido.id}`);
        cart = [];
        updateCart();
    })
    .catch(err => {
        console.error(err);
        alert("Erro ao enviar pedido!");
    });
}

// Adiciona botão finalizar dinamicamente
const cartSection = document.querySelector(".cart");
const btnFinalize = document.createElement("button");
btnFinalize.textContent = "Finalizar Compra";
btnFinalize.onclick = finalizarPedido;
cartSection.appendChild(btnFinalize);

