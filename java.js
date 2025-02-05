document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total"); // Ensure this exists in HTML
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const checkoutButton = document.getElementById("checkout");
    const paymentOptions = document.getElementById("payment-options");
    const paymentForm = document.getElementById("payment-form");
    const bankDetails = document.getElementById("bank-details");
    const navLinks = document.querySelector(".nav-links");

    // ✅ Fix: Ensure elements exist before adding event listeners
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const productElement = event.target.closest(".product");

                if (!productElement) return; // Prevent errors if button is outside .product

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

    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            paymentOptions.style.display = "block";
        });
    }

    if (paymentForm) {
        paymentForm.addEventListener("change", (event) => {
            if (event.target.name === "payment-method" && event.target.value === "bank-transfer") {
                bankDetails.style.display = "block";
            } else {
                bankDetails.style.display = "none";
            }
        });

        paymentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const paymentMethod = paymentForm.querySelector('input[name="payment-method"]:checked').value;

            if (paymentMethod === "bank-transfer") {
                const accountNumber = document.getElementById("account-number").value;
                const bankName = document.getElementById("bank-name").value;
                alert(`Payment successful! Bank Transfer to ${bankName}, Account Number: ${accountNumber}`);
            } else {
                alert("Payment successful!");
            }
        });
    }

    if (dropdownBtn && navLinks) {
        dropdownBtn.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!dropdownBtn.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove("show");
            }
        });
    }

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(li);
        });

        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
});
