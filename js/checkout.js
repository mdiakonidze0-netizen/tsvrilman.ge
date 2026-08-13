const checkoutCartKey = "tsvrilmani_cart";

let checkoutCart = JSON.parse(
    localStorage.getItem(checkoutCartKey)
) || [];

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");


function renderCheckout() {

    if (!checkoutItems || !checkoutTotal) {
        return;
    }

    if (checkoutCart.length === 0) {

        checkoutItems.innerHTML = `
            <p>შენი კალათა ცარიელია.</p>
            <br>
            <a href="index.html" class="primary-button">
                პროდუქტების ნახვა
            </a>
        `;

        checkoutTotal.textContent = "0.00 €";

        return;
    }

    let total = 0;

    checkoutItems.innerHTML =
        checkoutCart.map(item => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            return `
                <div class="summary-item">

                    <span>
                        ${item.name}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${itemTotal.toFixed(2)} €
                    </strong>

                </div>
            `;

        }).join("");

    checkoutTotal.textContent =
        ${total.toFixed(2)} €;
}


renderCheckout();


const checkoutForm =
    document.getElementById("checkoutForm");


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (checkoutCart.length === 0) {

                alert(
                    "შეკვეთის გასაფორმებლად კალათაში პროდუქტი უნდა იყოს."
                );

                return;
            }

            const firstName =
                document.getElementById("firstName")
                .value.trim();

            const lastName =
                document.getElementById("lastName")
                .value.trim();

            const email =
                document.getElementById("email")
                .value.trim();

            const phone =
                document.getElementById("phone")
                .value.trim();

            const country =
                document.getElementById("country")
                .value;

            const city =
                document.getElementById("city")
                .value.trim();

            const address =
                document.getElementById("address")
                .value.trim();

            const postalCode =
                document.getElementById("postalCode")
                .value.trim();


            if (
                !firstName ||
                !lastName ||
                !email ||
                !phone ||
                !country ||
                !city ||
                !address
            ) {

                alert(
                    "გთხოვ, შეავსე ყველა აუცილებელი ველი."
                );

                return;
            }


            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                )?.value || "card";


            const delivery =
                document.querySelector(
                    'input[name="delivery"]:checked'
                )?.value || "standard";


            const order = {

                id:
                    "ORD-" + Date.now(),

                customer: {

                    firstName,
                    lastName,
                    email,
                    phone,
                    country,
                    city,
                    address,
                    postalCode

                },

                payment,

                delivery,

                products:
                    checkoutCart,

                total:
                    checkoutCart.reduce(
                        (sum, item) =>
                            sum +
                            item.price *
                            item.quantity,
                        0
                    ),

                createdAt:
                    new Date().toISOString()

            };


            localStorage.setItem(
                "last_order",
                JSON.stringify(order)
            );


            alert(
                "შეკვეთის მონაცემები მიღებულია ✅"
            );

        }
    );
}
