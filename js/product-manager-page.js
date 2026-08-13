const productName =
    document.getElementById("productName");

const productPrice =
    document.getElementById("productPrice");

const productCategory =
    document.getElementById("productCategory");

const productStock =
    document.getElementById("productStock");

const productImage =
    document.getElementById("productImage");

const productDescription =
    document.getElementById("productDescription");

const productId =
    document.getElementById("productId");

const productsList =
    document.getElementById("productsList");

const productSearch =
    document.getElementById("productSearch");

const productMessage =
    document.getElementById("productMessage");

const productFormTitle =
    document.getElementById(
        "productFormTitle"
    );

const saveProductButton =
    document.getElementById(
        "saveProduct"
    );

const cancelEditButton =
    document.getElementById(
        "cancelEdit"
    );


function showProductMessage(
    message
) {

    if (productMessage) {

        productMessage.textContent =
            message;

    }

}


function clearProductForm() {

    productId.value = "";

    productName.value = "";

    productPrice.value = "";

    productCategory.value = "";

    productStock.value = "";

    productImage.value = "";

    productDescription.value = "";

    productFormTitle.textContent =
        "➕ ახალი პროდუქტი";

}


function renderProducts(
    products
) {

    if (!productsList) {
        return;
    }


    if (
        !products ||
        products.length === 0
    ) {

        productsList.innerHTML = `
            <p>
                პროდუქტები ჯერ არ არის დამატებული.
            </p>
        `;

        return;
    }


    productsList.innerHTML =
        products
            .map(
                product => `

                <div
                    class="admin-product"
                    data-product-id="${product.id}"
                >

                    <h3>
                        ${escapeHtml(
                            product.name
                        )}
                    </h3>

                    <p>
                        💰
                        ${Number(
                            product.price || 0
                        ).toFixed(2)}
                    </p>

                    <p>
                        📦 მარაგი:
                        ${Number(
                            product.stock || 0
                        )}
                    </p>

                    <p>
                        📂
                        ${escapeHtml(
                            product.category || "—"
                        )}
                    </p>

                    <p>
                        ${escapeHtml(
                            product.description || ""
                        )}
                    </p>

                    <button
                        type="button"
                        data-edit-product="${product.id}"
                    >
                        ✏️ რედაქტირება
                    </button>

                    <button
                        type="button"
                        data-delete-product="${product.id}"
                    >
                        🗑️ წაშლა
                    </button>

                </div>

            `
            )
            .join("");


    attachProductButtons();

}


function attachProductButtons() {

    document
        .querySelectorAll(
            "[data-edit-product]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        editProduct(
                            Number(
                                button.dataset
                                    .editProduct
                            )
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-delete-product]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteProductFromPage(
                            Number(
                                button.dataset
                                    .deleteProduct
                            )
                        );

                    }
                );

            }
        );

}


function editProduct(id) {

    const product =
        getProduct(id);


    if (!product) {

        showProductMessage(
            "პროდუქტი ვერ მოიძებნა."
        );

        return;
    }


    productId.value =
        product.id;

    productName.value =
        product.name;

    productPrice.value =
        product.price;

    productCategory.value =
        product.category || "";

    productStock.value =
        product.stock || 0;

    productImage.value =
        product.image || "";

    productDescription.value =
        product.description || "";


    productFormTitle.textContent =
        "✏️ პროდუქტის რედაქტირება";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function deleteProductFromPage(
    id
) {

    const product =
        getProduct(id);


    if (!product) {
        return;
    }


    const confirmed =
        window.confirm(
            წავშალოთ "${product.name}"?
        );


    if (!confirmed) {
        return;
    }


    deleteProduct(id);

    renderProducts(
        getAllProducts()
    );


    showProductMessage(
        "პროდუქტი წაიშალა ✅"
    );

}


function saveProductFromPage() {

    const name =
        productName.value.trim();

    const price =
        Number(
            productPrice.value
        );

    const category =
        productCategory.value.trim();

    const stock =
        Number(
            productStock.value
        );

    const image =
        productImage.value.trim();

    const description =
        productDescription.value.trim();


    if (!name) {

        showProductMessage(
            "მიუთითე პროდუქტის სახელი."
        );

        return;
    }


    if (
        Number.isNaN(price) ||
        price < 0
    ) {

        showProductMessage(
            "მიუთითე სწორი ფასი."
        );

        return;
    }


    if (
        Number.isNaN(stock) ||
        stock < 0
    ) {

        showProductMessage(
            "მიუთითე სწორი მარაგი."
        );

        return;
    }


    if (productId.value) {

        updateProduct(
            Number(
                productId.value
            ),
            {
                name,
                price,
                category,
                stock,
                image,
                description
            }
        );


        showProductMessage(
            "პროდუქტი განახლდა ✅"
        );

    } else {

        createProduct({
            name,
            price,
            category,
            stock,
            image,
            description
        });


        showProductMessage(
            "პროდუქტი დაემატა ✅"
        );

    }


    clearProductForm();

    renderProducts(
        getAllProducts()
    );

}


function escapeHtml(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


if (saveProductButton) {

    saveProductButton.addEventListener(
        "click",
        saveProductFromPage
    );

}


if (cancelEditButton) {

    cancelEditButton.addEventListener(
        "click",
        clearProductForm
    );

}


if (productSearch) {

    productSearch.addEventListener(
        "input",
        () => {

            renderProducts(
                searchProducts(
                    productSearch.value
                )
            );

        }
    );

}


renderProducts(
    getAllProducts()
);
შედგენა
