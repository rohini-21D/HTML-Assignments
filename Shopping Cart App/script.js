async function fetchProducts() {
    const response=await fetch("https://fakestoreapi.com/products");
    const products=await response.json();
    renderProducts(products);
}

const cart=JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(products){
    const productlist=document.getElementById("product-list");
    productlist.innerHTML=" ";
    products.forEach(product => {
        const div =document.createElement("div");
        div.classList.add("product");
        div.innerHTML=`
        <img src="${product.image}" width="100" height="100" alt="${product.title}">
        <p>$ ${product.price}</p>
        <p>$ ${product.description}</p>
        <button onclick="addToCart(${product.id},'${product.title}','${product.price}')" class="addtocart">Add To Cart</button>
        `
        productlist.appendChild(div);
    });
}
function renderCart(){
    const carditems=document.getElementById("card-items");
    carditems.innerHTML=" ";
    let total=0;
    cart.forEach((item,index)=>{
        total+=item.price*item.quantity;
        const div=document.createElement("div");
        div.innerHTML = `
        <p>${item.name} (x${item.quantity}) - $${item.price * item.quantity}</p>
        <button onclick="removeFromCart(${index})" class="removebutton">Remove</button>
        `
        carditems.appendChild(div);
    })
    document.getElementById("cart-total").textContent = total.toFixed(2);
    document.getElementById("cart-count").textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function clearCart() {
    cart.length = 0;
    renderCart();
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
}

fetchProducts();
renderCart();