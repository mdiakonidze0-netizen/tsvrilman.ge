const cartKey = "tsvrilmani_cart";

let cart = JSON.parse(
    localStorage.getItem(cartKey)
) || [];


function saveCart() {
    localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
    );
}


function addToCart(product) {

    const existing =
        cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();

    updateCartCount();

    alert("პროდუქტი დაემატა კალათაში 🛒");
}


function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    renderCart();

    updateCartCount();
}


function decreaseQuantity(productId) {

    const product =
        cart.find(item => item.id === productId);

    if (!product) return;

    product.quantity -= 1;

    if (product.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();

    renderCart();

    updateCartCount();
}


function increaseQuantity(productId) {

    const product =
        cart.find(item => item.id === productId);

    if (!product) return;

    product.quantity += 1;

    saveCart();

    renderCart();

    updateCartCount();
}


function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
}


function updateCartCount() {

    const countElement =
        document.getElementById("cartCount");

    if (!countElement) return;

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    countElement.textContent = count;
}


function renderCart() {

    const container =
        document.getElementById("cartItems");

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-products">

                <div>

                    <div class="empty-icon">
                        🛒
                    </div>

                    <h3>
                        კალათა ცარიელია
                    </h3>

                    <p>
                        ჯერ არცერთი პროდუქტი არ დაგიმატებია.
                    </p>

                    <br>

                    <a
                        href="index.html"
                        class="primary-button"
                    >
                        პროდუქტების ნახვა
                    </a>

                </div>

            </div>
        `;

        return;
    }


    container.innerHTML = `

        <div class="cart-list">

            ${cart.map(item => `

                <div class="cart-item">

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ${item.price.toFixed(2)} €
                        </p>

                    </div>

                    <div class="quantity">

                        <button
                            onclick="decreaseQuantity(${item.id})"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${item.id})"
                        >
                            +
                        </button>

                    </div>

                    <strong>
                        ${(item.price * item.quantity).toFixed(2)} €
                    </strong>

                    <button
                        onclick="removeFromCart(${item.id})"
                    >
                        🗑️
                    </button>

                </div>

            `).join("")}

        </div>


        <div class="cart-summary">

            <h2>
                ჯამი:
                ${getCartTotal().toFixed(2)} €
            </h2>

            <a
                href="checkout.html"
                class="primary-button"
            >
                გადახდაზე გადასვლა
            </a>

        </div>
    `;
}


renderCart();

updateCartCount();
