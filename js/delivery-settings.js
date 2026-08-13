const DELIVERY_SETTINGS_KEY =
    "tsvrilmani_delivery_settings";

const EUROPE_COUNTRIES = [

    { code: "AT", name: "ავსტრია" },
    { code: "BE", name: "ბელგია" },
    { code: "BG", name: "ბულგარეთი" },
    { code: "HR", name: "ხორვატია" },
    { code: "CY", name: "კვიპროსი" },
    { code: "CZ", name: "ჩეხეთი" },
    { code: "DK", name: "დანია" },
    { code: "EE", name: "ესტონეთი" },
    { code: "FI", name: "ფინეთი" },
    { code: "FR", name: "საფრანგეთი" },
    { code: "DE", name: "გერმანია" },
    { code: "GR", name: "საბერძნეთი" },
    { code: "HU", name: "უნგრეთი" },
    { code: "IE", name: "ირლანდია" },
    { code: "IT", name: "იტალია" },
    { code: "LV", name: "ლატვია" },
    { code: "LT", name: "ლიტვა" },
    { code: "LU", name: "ლუქსემბურგი" },
    { code: "MT", name: "მალტა" },
    { code: "NL", name: "ნიდერლანდები" },
    { code: "PL", name: "პოლონეთი" },
    { code: "PT", name: "პორტუგალია" },
    { code: "RO", name: "რუმინეთი" },
    { code: "SK", name: "სლოვაკეთი" },
    { code: "SI", name: "სლოვენია" },
    { code: "ES", name: "ესპანეთი" },
    { code: "SE", name: "შვედეთი" },

    { code: "GB", name: "გაერთიანებული სამეფო" },
    { code: "NO", name: "ნორვეგია" },
    { code: "IS", name: "ისლანდია" },
    { code: "CH", name: "შვეიცარია" },

    { code: "GE", name: "საქართველო" }

];


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
        "BE"
    ]

};


let deliverySettings =
    JSON.parse(
        localStorage.getItem(
            DELIVERY_SETTINGS_KEY
        )
    ) || defaultDeliverySettings;


function saveDeliverySettings() {

    localStorage.setItem(
        DELIVERY_SETTINGS_KEY,
        JSON.stringify(
            deliverySettings
        )
    );

}


function loadDeliverySettings() {

    const standardEnabled =
        document.getElementById(
            "standardEnabled"
        );

    const standardPrice =
        document.getElementById(
            "standardPrice"
        );

    const expressEnabled =
        document.getElementById(
            "expressEnabled"
        );

    const expressPrice =
        document.getElementById(
            "expressPrice"
        );


    if (standardEnabled) {

        standardEnabled.checked =
            deliverySettings
                .standard
                .enabled;

    }


    if (standardPrice) {

        standardPrice.value =
            deliverySettings
                .standard
                .price;

    }


    if (expressEnabled) {

        expressEnabled.checked =
            deliverySettings
                .express
                .enabled;

    }


    if (expressPrice) {

        expressPrice.value =
            deliverySettings
                .express
                .price;

    }


    renderCountries();

}


function showMessage(message) {

    const element =
        document.getElementById(
            "deliveryMessage"
        );

    if (element) {

        element.textContent =
            message;

    }

}


const saveStandard =
    document.getElementById(
        "saveStandard"
    );


if (saveStandard) {

    saveStandard.addEventListener(
        "click",
        () => {

            deliverySettings
                .standard
                .enabled =
                document.getElementById(
                    "standardEnabled"
                ).checked;


            deliverySettings
                .standard
                .price =
                Number(
                    document.getElementById(
                        "standardPrice"
                    ).value
                );


            saveDeliverySettings();

            showMessage(
                "სტანდარტული მიწოდება შენახულია ✅"
            );

        }
    );

}


const saveExpress =
    document.getElementById(
        "saveExpress"
    );


if (saveExpress) {

    saveExpress.addEventListener(
        "click",
        () => {

            deliverySettings
                .express
                .enabled =
                document.getElementById(
                    "expressEnabled"
                ).checked;


            deliverySettings
                .express
                .price =
                Number(
                    document.getElementById(
                        "expressPrice"
                    ).value
                );


            saveDeliverySettings();

            showMessage(
                "სწრაფი მიწოდება შენახულია ✅"
            );

        }
    );

}


function renderCountries() {

    const countryList =
        document.getElementById(
            "countryList"
        );


    if (!countryList) {
        return;
    }


    countryList.innerHTML =
        EUROPE_COUNTRIES
            .map(country => `

                <label
                    style="
                        display:block;
                        margin:8px 0;
                    "
                >

                    <input
                        type="checkbox"
                        value="${country.code}"
                        class="country-checkbox"
                        ${
                            deliverySettings
                                .countries
                                .includes(
                                    country.code
                                )
                                ? "checked"
                                : ""
                        }
                    >

                    ${country.name}

                </label>

            `)
            .join("");

}


const saveCountries =
    document.getElementById(
        "saveCountries"
    );


if (saveCountries) {

    saveCountries.addEventListener(
        "click",
        () => {

            const selected =
                Array.from(
                    document.querySelectorAll(
                        ".country-checkbox:checked"
                    )
                )
                .map(
                    checkbox =>
                        checkbox.value
                );


            deliverySettings.countries =
                selected;


            saveDeliverySettings();

            showMessage(
                "ქვეყნების პარამეტრები შენახულია ✅"
            );

        }
    );

}


loadDeliverySettings();
შედგენა
