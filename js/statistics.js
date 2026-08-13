const ORDERS_STATISTICS_KEY = "tsvrilmani_orders";

function getOrdersForStatistics() {

    return JSON.parse(
        localStorage.getItem(
            ORDERS_STATISTICS_KEY
        )
    ) || [];
}


function calculateStatistics() {

    const orders =
        getOrdersForStatistics();


    const validOrders =
        orders.filter(
            order =>
                order.status !== "cancelled"
        );


    const totalSales =
        validOrders.reduce(
            (sum, order) =>
                sum +
                Number(order.total || 0),
            0
        );


    const totalOrders =
        validOrders.length;


    const productSales = {};


    validOrders.forEach(
        order => {

            (order.products || [])
                .forEach(product => {

                    const name =
                        product.name ||
                        "უცნობი პროდუქტი";

                    const quantity =
                        Number(
                            product.quantity || 0
                        );

                    const revenue =
                        Number(
                            product.price || 0
                        ) * quantity;


                    if (
                        !productSales[name]
                    ) {

                        productSales[name] = {

                            name,

                            quantity: 0,

                            revenue: 0

                        };
                    }


                    productSales[name]
                        .quantity += quantity;


                    productSales[name]
                        .revenue += revenue;

                });

        }
    );


    const bestProducts =
        Object.values(
            productSales
        )
        .sort(
            (a, b) =>
                b.quantity -
                a.quantity
        );


    const bestProduct =
        bestProducts.length > 0
            ? bestProducts[0]
            : null;


    const averageOrder =
        totalOrders > 0
            ? totalSales /
              totalOrders
            : 0;


    return {

        totalSales,

        totalOrders,

        averageOrder,

        bestProduct,

        products:
            bestProducts

    };
}


function renderStatistics() {

    const statistics =
        calculateStatistics();


    const totalSalesElement =
        document.getElementById(
            "totalSales"
        );


    const totalOrdersElement =
        document.getElementById(
            "totalOrders"
        );


    const topProductElement =
        document.getElementById(
            "topProduct"
        );


    const averageOrderElement =
        document.getElementById(
            "averageOrder"
        );


    if (totalSalesElement) {

        totalSalesElement.textContent =
            ${statistics.totalSales.toFixed(2)} €;
    }


    if (totalOrdersElement) {

        totalOrdersElement.textContent =
            statistics.totalOrders;
    }


    if (topProductElement) {

        topProductElement.textContent =
            statistics.bestProduct
                ? statistics.bestProduct.name
                : "—";
    }


    if (averageOrderElement) {

        averageOrderElement.textContent =
            ${statistics.averageOrder.toFixed(2)} €;
    }


    const productStatistics =
        document.getElementById(
            "productStatistics"
        );


    if (
        productStatistics &&
        statistics.products.length > 0
    ) {

        productStatistics.innerHTML =
            statistics.products
                .map(product => `

                    <div class="admin-product">

                        <strong>
                            ${product.name}
                        </strong>

                        <span>
                            გაყიდულია:
                            ${product.quantity}
                        </span>

                        <span>
                            შემოსავალი:
                            ${product.revenue.toFixed(2)} €
                        </span>

                    </div>

                `)
                .join("");

    } else if (productStatistics) {

        productStatistics.innerHTML = `
            <p>
                გაყიდვების მონაცემები ჯერ არ არის.
            </p>
        `;
    }
}


document.addEventListener(
    "DOMContentLoaded",
    renderStatistics
);
შედგენა
