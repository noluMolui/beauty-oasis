document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const checkoutButton = document.getElementById("checkout");

    // ✅ Add items to cart
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const productElement = event.target.closest(".product");

                if (!productElement) return;

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
    }

    // ✅ Checkout - Send WhatsApp Message
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            let totalAmount = document.getElementById("cart-total").textContent; // Get total price
            let phoneNumber = "27794372926"; // ✅ WhatsApp number (International format)

            if (cart.length === 0 || totalAmount === "0" || totalAmount === "") {
                alert("Your cart is empty. Add items before checking out!");
                return;
            }

            let message = `Hello, I want to place an order. My total is $${totalAmount}. Please send me your banking details.`;
            let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank"); // ✅ Open WhatsApp chat
        });
    }

    // ✅ Update Cart (Added Remove Button)
    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const li = document.createElement("li");
            li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;

            // ✅ Create Remove Button
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.style.marginLeft = "10px";
            removeButton.style.background = "#ff4d4d";
            removeButton.style.color = "white";
            removeButton.style.border = "none";
            removeButton.style.padding = "5px 10px";
            removeButton.style.cursor = "pointer";
            removeButton.style.borderRadius = "5px";

            // ✅ Remove item when button is clicked
            removeButton.addEventListener("click", () => {
                removeFromCart(index);
            });

            li.appendChild(removeButton);
            cartItems.appendChild(li);
        });

        if (cartTotal) cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // ✅ Remove item from cart
    function removeFromCart(index) {
        cart.splice(index, 1); // ✅ Remove the item from the cart array
        updateCart(); // ✅ Refresh the cart display
    }
});

