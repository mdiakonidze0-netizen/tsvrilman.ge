const ORDERS_KEY = "tsvrilmani_orders";

let orders =
    JSON.parse(
        localStorage.getItem(ORDERS_KEY)
    ) || [];


function saveOrders() {

    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(orders)
    );
}


function createOrder(orderData) {

    const order = {

        id:
            "ORD-" +
            Date.now(),

        customer:
            orderData.customer || {},

        products:
            orderData.products || [],

        total:
            Number(orderData.total || 0),

        payment:
            orderData.payment || "card",

        delivery:
            orderData.delivery || "standard",

        status:
            "new",

        createdAt:
            new Date().toISOString()

    };


    orders.push(order);

    saveOrders();

    return order;
}


function getOrders() {

    return [...orders].reverse();
}


function getOrder(id) {

    return orders.find(
        order =>
            order.id === id
    );
}


function updateOrderStatus(
    id,
    status
) {

    const allowedStatuses = [
        "new",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
    ];


    if (
        !allowedStatuses.includes(
            status
        )
    ) {

        return false;
    }


    const order =
        orders.find(
            item =>
                item.id === id
        );


    if (!order) {
        return false;
    }


    order.status = status;

    saveOrders();

    return true;
}


function deleteOrder(id) {

    const exists =
        orders.some(
            order =>
                order.id === id
        );


    if (!exists) {
        return false;
    }


    orders =
        orders.filter(
            order =>
                order.id !== id
        );


    saveOrders();

    return true;
}


function getOrderStatistics() {

    const totalOrders =
        orders.length;


    const totalSales =
        orders
            .filter(
                order =>
                    order.status !==
                    "cancelled"
            )
            .reduce(
                (
                    total,
                    order
                ) =>
                    total +
                    Number(
                        order.total || 0
                    ),
                0
            );


    const deliveredOrders =
        orders.filter(
            order =>
                order.status ===
                "delivered"
        ).length;


    const cancelledOrders =
        orders.filter(
            order =>
                order.status ===
                "cancelled"
        ).length;


    return {

        totalOrders,

        totalSales,

        deliveredOrders,

        cancelledOrders

    };
}
შედგენა
