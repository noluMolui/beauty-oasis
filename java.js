document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const checkoutButton = document.getElementById("checkout");
    const cartButton = document.getElementById("cart-button");
    const cartDropdown = document.getElementById("cart-dropdown");

    // Toggle cart dropdown visibility
    cartButton.addEventListener("click", (event) => {
        event.preventDefault();
        cartDropdown.style.display = (cartDropdown.style.display === "block") ? "none" : "block";
    });

    // Close cart when clicking outside
    document.addEventListener("click", (event) => {
        if (!cartButton.contains(event.target) && !cartDropdown.contains(event.target)) {
            cartDropdown.style.display = "none";
        }
    });

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product");
            const productId = productElement.dataset.id;
            const productName = productElement.dataset.name;
            const productPrice = parseFloat(productElement.dataset.price);
            
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(li);
        });
        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    checkoutButton.addEventListener("click", () => {
        alert("Proceeding to checkout...");
        // Add checkout functionality here
    });
});
