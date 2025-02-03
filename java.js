document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const checkoutButton = document.getElementById("checkout");
    const paymentOptions = document.getElementById("payment-options");
    const paymentForm = document.getElementById("payment-form");
    const bankDetails = document.getElementById("bank-details");

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

    checkoutButton.addEventListener("click", () => {
        paymentOptions.style.display = "block";
    });

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

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            li.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
            cartItems.appendChild(li);
        });
        cartTotal.textContent = total;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
});