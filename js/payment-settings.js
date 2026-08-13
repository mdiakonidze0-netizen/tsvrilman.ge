const PAYMENT_SETTINGS_KEY =
    "tsvrilmani_payment_settings";

const CUSTOM_METHODS_KEY =
    "tsvrilmani_custom_payment_methods";


const defaultSettings = {

    card: {
        enabled: true,
        provider: ""
    },

    paypal: {
        enabled: false
    },

    currency: "EUR"

};


let settings =
    JSON.parse(
        localStorage.getItem(
            PAYMENT_SETTINGS_KEY
        )
    ) || defaultSettings;


let customMethods =
    JSON.parse(
        localStorage.getItem(
            CUSTOM_METHODS_KEY
        )
    ) || [];


function saveSettings() {

    localStorage.setItem(
        PAYMENT_SETTINGS_KEY,
        JSON.stringify(settings)
    );

}


function saveCustomMethods() {

    localStorage.setItem(
        CUSTOM_METHODS_KEY,
        JSON.stringify(customMethods)
    );

}


function showMessage(message) {

    const element =
        document.getElementById(
            "paymentMessage"
        );

    if (element) {

        element.textContent =
            message;

    }

}


function loadSettings() {

    const cardEnabled =
        document.getElementById(
            "cardEnabled"
        );

    const cardProvider =
        document.getElementById(
            "cardProvider"
        );

    const paypalEnabled =
        document.getElementById(
            "paypalEnabled"
        );

    const currency =
        document.getElementById(
            "currency"
        );


    if (cardEnabled) {

        cardEnabled.checked =
            Boolean(
                settings.card.enabled
            );

    }


    if (cardProvider) {

        cardProvider.value =
            settings.card.provider ||
            "";

    }


    if (paypalEnabled) {

        paypalEnabled.checked =
            Boolean(
                settings.paypal.enabled
            );

    }


    if (currency) {

        currency.value =
            settings.currency;

    }


    renderCustomMethods();

}


const saveCardButton =
    document.getElementById(
        "saveCardSettings"
    );


if (saveCardButton) {

    saveCardButton.addEventListener(
        "click",
        () => {

            settings.card.enabled =
                document.getElementById(
                    "cardEnabled"
                ).checked;


            settings.card.provider =
                document.getElementById(
                    "cardProvider"
                ).value.trim();


            saveSettings();

            showMessage(
                "Visa / Mastercard-ის პარამეტრები შენახულია ✅"
            );

        }
    );

}


const savePaypalButton =
    document.getElementById(
        "savePaypalSettings"
    );


if (savePaypalButton) {

    savePaypalButton.addEventListener(
        "click",
        () => {

            settings.paypal.enabled =
                document.getElementById(
                    "paypalEnabled"
                ).checked;


            saveSettings();

            showMessage(
                "PayPal-ის პარამეტრები შენახულია ✅"
            );

        }
    );

}


const saveCurrencyButton =
    document.getElementById(
        "saveCurrency"
    );


if (saveCurrencyButton) {

    saveCurrencyButton.addEventListener(
        "click",
        () => {

            settings.currency =
                document.getElementById(
                    "currency"
                ).value;


            saveSettings();

            showMessage(
                "ვალუტა შენახულია ✅"
            );

        }
    );

}


const addPaymentButton =
    document.getElementById(
        "addPaymentMethod"
    );


if (addPaymentButton) {

    addPaymentButton.addEventListener(
        "click",
        () => {

            const input =
                document.getElementById(
                    "newPaymentMethod"
                );


            const name =
                input.value.trim();


            if (!name) {

                showMessage(
                    "მიუთითე გადახდის მეთოდის სახელი."
                );

                return;
            }


            const alreadyExists =
                customMethods.some(
                    method =>
                        method.name
                            .toLowerCase() ===
                        name.toLowerCase()
                );


            if (alreadyExists) {

                showMessage(
                    "ეს მეთოდი უკვე დამატებულია."
                );

                return;
            }


            customMethods.push({

                id:
                    Date.now(),

                name,

                enabled:
                    true

            });


            saveCustomMethods();

            input.value = "";

            renderCustomMethods();

            showMessage(
                "ახალი გადახდის მეთოდი დაემატა ✅"
            );

        }
    );

}


function renderCustomMethods() {

    const container =
        document.getElementById(
            "customPaymentMethods"
        );


    if (!container) {
        return;
    }


    if (
        customMethods.length === 0
    ) {

        container.innerHTML =
            "<p>დამატებითი მეთოდები ჯერ არ არის.</p>";

        return;
    }


    container.innerHTML =
        customMethods
            .map(
                method => `

                    <div class="admin-product">

                        <strong>
                            ${method.name}
                        </strong>

                        <label>

                            <input
                                type="checkbox"
                                data-payment-id="${method.id}"
                                ${method.enabled ? "checked" : ""}
                            >

                            ჩართულია

                        </label>

                        <button
                            type="button"
                            data-delete-payment="${method.id}"
                        >
                            🗑️ წაშლა
                        </button>

                    </div>

                `
            )
            .join("");


    container
        .querySelectorAll(
            "[data-payment-id]"
        )
        .forEach(
            checkbox => {

                checkbox.addEventListener(
                    "change",
                    () => {

                        const id =
                            Number(
                                checkbox
                                    .dataset
                                    .paymentId
                            );


                        const method =
                            customMethods.find(
                                item =>
                                    item.id === id
                            );


                        if (method) {

                            method.enabled =
                                checkbox.checked;

                            saveCustomMethods();

                        }

                    }
                );

            }
        );


    container
        .querySelectorAll(
            "[data-delete-payment]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button
                                    .dataset
                                    .deletePayment
                            );


                        customMethods =
                            customMethods.filter(
                                method =>
                                    method.id !== id
                            );


                        saveCustomMethods();

                        renderCustomMethods();

                    }
                );

            }
        );

}


loadSettings();
