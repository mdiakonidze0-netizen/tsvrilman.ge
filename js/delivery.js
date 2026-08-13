const DELIVERY_KEY = "tsvrilmani_delivery_settings";

const defaultDeliverySettings = {
    standard: {
        enabled: true,
        price: 0
    },

    express: {
        enabled: true,
        price: 0
    },

    countries: [
        "GE",
        "DE",
        "FR",
        "IT",
        "ES",
        "PL",
        "NL",
        "GR",
        "AT",
        "BE",
        "PT",
        "IE",
        "SE",
        "DK",
        "FI",
        "CZ",
        "RO",
        "BG",
        "HR",
        "HU"
    ]
};


let deliverySettings =
    JSON.parse(
        localStorage.getItem(DELIVERY_KEY)
    ) || defaultDeliverySettings;


function saveDeliverySettings() {

    localStorage.setItem(
        DELIVERY_KEY,
        JSON.stringify(deliverySettings)
    );
}


function isCountryAvailable(countryCode) {

    return deliverySettings.countries
        .includes(countryCode);
}


function getDeliveryPrice(type) {

    if (
        !deliverySettings[type] ||
        !deliverySettings[type].enabled
    ) {
        return 0;
    }

    return Number(
        deliverySettings[type].price
    );
}


function setDeliveryPrice(type, price) {

    if (!deliverySettings[type]) {
        return;
    }

    deliverySettings[type].price =
        Number(price);

    saveDeliverySettings();
}


function enableDelivery(type, enabled) {

    if (!deliverySettings[type]) {
        return;
    }

    deliverySettings[type].enabled =
        Boolean(enabled);

    saveDeliverySettings();
}


function addDeliveryCountry(countryCode) {

    if (
        !deliverySettings.countries
            .includes(countryCode)
    ) {

        deliverySettings.countries.push(
            countryCode
        );

        saveDeliverySettings();
    }
}


function removeDeliveryCountry(countryCode) {

    deliverySettings.countries =
        deliverySettings.countries.filter(
            country =>
                country !== countryCode
        );

    saveDeliverySettings();
}


saveDeliverySettings();
