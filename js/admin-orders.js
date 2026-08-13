<script src="js/orders.js"></script>
<script src="js/admin-orders.js"></script>
document.addEventListener("DOMContentLoaded", () => {

    const ordersList =
        document.getElementById("ordersList");

    if (!ordersList) {
        return;
    }

    function getOrders() {

        try {

            return JSON.parse(
                localStorage.getItem("orders")
            ) || [];

        } catch (error) {

            console.error(
                "შეკვეთების წაკითხვის შეცდომა:",
                error
            );

            return [];

        }
    }

    function saveOrders(orders) {

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

    }

    function renderOrders() {

        const orders = getOrders();

        if (orders.length === 0) {

            ordersList.innerHTML = `
                <p>
                    შეკვეთები ჯერ არ არის.
                </p>
            `;

            return;
        }

        ordersList.innerHTML = orders
            .map((order, index) => {

                const orderNumber =
                    order.id ||
                    order.orderId ||
                    #${index + 1};

                const customer =
                    order.customerName ||
                    order.name ||
                    "მომხმარებელი";

                const email =
                    order.email ||
                    "ელფოსტა მითითებული არ არის";

                const total =
                    Number(
                        order.total ||
                        order.amount ||
                        0
                    ).toFixed(2);

                const status =
                    order.status ||
                    "ახალი";

                return `
                    <div class="admin-card">

                        <h3>
                            შეკვეთა ${orderNumber}
                        </h3>

                        <p>
                            👤 ${customer}
                        </p>

                        <p>
                            ✉️ ${email}
                        </p>

                        <p>
                            💰 ${total} EUR
                        </p>

                        <p>
                            📌 სტატუსი:
                            <strong>
                                ${status}
                            </strong>
                        </p>

                        <label>
                            სტატუსის შეცვლა
                        </label>

                        <select
                            data-order-index="${index}"
                            class="order-status"
                        >

                            <option value="ახალი"
                                ${status === "ახალი" ? "selected" : ""}>
                                ახალი
                            </option>

                            <option value="დადასტურებული"
                                ${status === "დადასტურებული" ? "selected" : ""}>
                                დადასტურებული
                            </option>

                            <option value="გაგზავნილი"
                                ${status === "გაგზავნილი" ? "selected" : ""}>
                                გაგზავნილი
                            </option>

                            <option value="მიწოდებული"
                                ${status === "მიწოდებული" ? "selected" : ""}>
                                მიწოდებული
                            </option>

                            <option value="გაუქმებული"
                                ${status === "გაუქმებული" ? "selected" : ""}>
                                გაუქმებული
                            </option>

                        </select>

                    </div>
                `;

            })
            .join("");

        document
            .querySelectorAll(".order-status")
            .forEach(select => {

                select.addEventListener(
                    "change",
                    () => {

                        const index =
                            Number(
                                select.dataset
                                    .orderIndex
                            );

                        const orders =
                            getOrders();

                        if (!orders[index]) {
                            return;
                        }

                        orders[index].status =
                            select.value;

                        saveOrders(orders);

                        renderOrders();

                    }
                );

            });

    }

    renderOrders();

});
შედგენა
მისწერეთ მიშიკო დიაკონიძე
