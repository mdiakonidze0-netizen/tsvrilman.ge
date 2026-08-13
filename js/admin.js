const PRODUCTS_KEY = "tsvrilmani_products";
const ORDERS_KEY = "tsvrilmani_orders";


let products =
    JSON.parse(
        localStorage.getItem(PRODUCTS_KEY)
    ) || [];


let orders =
    JSON.parse(
        localStorage.getItem(ORDERS_KEY)
    ) || [];


const productManager =
    document.getElementById("productManager");

const ordersList =
    document.getElementById("ordersList");

const totalProducts =
    document.getElementById("totalProducts");

const totalOrders =
    document.getElementById("totalOrders");

const totalSales =
    document.getElementById("totalSales");

const topProduct =
    document.getElementById("topProduct");


function saveProducts() {

    localStorage.setItem(
        PRODUCTS_KEY,
        JSON.stringify(products)
    );
}


function saveOrders() {

    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(orders)
    );
}


function updateStatistics() {

    if (totalProducts) {

        totalProducts.textContent =
            products.length;
    }


    if (totalOrders) {

        totalOrders.textContent =
            orders.length;
    }


    const sales =
        orders.reduce(
            (sum, order) =>
                sum + Number(order.total || 0),
            0
        );


    if (totalSales) {

        totalSales.textContent =
            ${sales.toFixed(2)} €;
    }


    const soldProducts = {};


    orders.forEach(order => {

        (order.products || []).forEach(product => {

            if (!soldProducts[product.name]) {

                soldProducts[product.name] = 0;
            }

            soldProducts[product.name] +=
                Number(product.quantity || 0);
        });

    });


    let bestProduct = "—";
    let bestQuantity = 0;


    Object.entries(soldProducts).forEach(
        ([name, quantity]) => {

            if (quantity > bestQuantity) {

                bestQuantity = quantity;
                bestProduct = name;
            }

        }
    );


    if (topProduct) {

        topProduct.textContent =
            bestProduct;
    }
}


function renderProducts() {

    if (!productManager) {
        return;
    }


    if (products.length === 0) {

        productManager.innerHTML = `
            <p>
                პროდუქტები ჯერ არ არის დამატებული.
            </p>
        `;

        return;
    }


    productManager.innerHTML =
        products.map(product => `

            <div class="admin-product">

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <p>
                        ${Number(product.price).toFixed(2)} €
                    </p>

                </div>


                <button
                    onclick="deleteProduct(${product.id})"
                >
                    🗑️ წაშლა
                </button>

            </div>

        `).join("");
}


function deleteProduct(id) {

    const confirmed =
        confirm(
            "ნამდვილად გინდა ამ პროდუქტის წაშლა?"
        );


    if (!confirmed) {
        return;
    }


    products =
        products.filter(
            product =>
                product.id !== id
        );


    saveProducts();

    renderProducts();

    updateStatistics();
}


const addProductButton =
    document.getElementById(
        "addProductButton"
    );


if (addProductButton) {

    addProductButton.addEventListener(
        "click",
        () => {

            const name =
                prompt(
                    "პროდუქტის სახელი:"
                );


            if (!name) {
                return;
            }


            const price =
                Number(
                    prompt(
                        "პროდუქტის ფასი (€):"
                    )
                );


            if (
                Number.isNaN(price) ||
                price < 0
            ) {

                alert(
                    "გთხოვ, მიუთითე სწორი ფასი."
                );

                return;
            }


            const product = {

                id:
                    Date.now(),

                name:
                    name.trim(),

                price:
                    price,

                image:
                    "",

                description:
                    ""

            };


            products.push(product);

            saveProducts();

            renderProducts();

            updateStatistics();


            alert(
                "პროდუქტი დაემატა ✅"
            );
        }
    );
}


function renderOrders() {

    if (!ordersList) {
        return;
    }


    if (orders.length === 0) {

        ordersList.innerHTML = `
            <p>
                შეკვეთები ჯერ არ არის.
            </p>
        `;

        return;
    }


    ordersList.innerHTML =
        orders.map(order => `

            <div class="admin-order">

                <strong>
                    ${order.id}
                </strong>

                <p>
                    ${order.customer?.firstName || ""}
                    ${order.customer?.lastName || ""}
                </p>

                <p>
                    ${order.customer?.email || ""}
                </p>

                <strong>
                    ${Number(order.total || 0).toFixed(2)} €
                </strong>

            </div>

        `).join("");
}


renderProducts();

renderOrders();

updateStatistics();
შედგენა
