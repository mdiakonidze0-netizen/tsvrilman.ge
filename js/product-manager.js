const PRODUCTS_KEY = "tsvrilmani_products";

let products =
    JSON.parse(
        localStorage.getItem(PRODUCTS_KEY)
    ) || [];


function saveProducts() {

    localStorage.setItem(
        PRODUCTS_KEY,
        JSON.stringify(products)
    );
}


function createProduct({
    name,
    price,
    description = "",
    image = "",
    category = "",
    stock = 0
}) {

    const product = {

        id: Date.now(),

        name: name.trim(),

        price: Number(price),

        description: description.trim(),

        image: image.trim(),

        category: category.trim(),

        stock: Number(stock),

        createdAt:
            new Date().toISOString()

    };


    products.push(product);

    saveProducts();

    return product;
}


function updateProduct(
    id,
    changes
) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {
        return false;
    }


    Object.assign(
        product,
        changes
    );


    if (changes.price !== undefined) {

        product.price =
            Number(changes.price);
    }


    if (changes.stock !== undefined) {

        product.stock =
            Number(changes.stock);
    }


    saveProducts();

    return true;
}


function deleteProduct(id) {

    const exists =
        products.some(
            product =>
                product.id === id
        );


    if (!exists) {
        return false;
    }


    products =
        products.filter(
            product =>
                product.id !== id
        );


    saveProducts();

    return true;
}


function getProduct(id) {

    return products.find(
        product =>
            product.id === id
    );
}


function getAllProducts() {

    return [...products];
}


function searchProducts(query) {

    const search =
        query
            .toLowerCase()
            .trim();


    if (!search) {
        return getAllProducts();
    }


    return products.filter(
        product => {

            return (

                product.name
                    .toLowerCase()
                    .includes(search)

                ||

                product.category
                    .toLowerCase()
                    .includes(search)

                ||

                product.description
                    .toLowerCase()
                    .includes(search)

            );

        }
    );
}
შედგენა
