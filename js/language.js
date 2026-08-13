const LANGUAGE_KEY = "tsvrilmani_language";

const translations = {

    ka: {
        home: "მთავარი",
        products: "პროდუქტები",
        cart: "კალათა",
        checkout: "შეკვეთის გაფორმება",
        search: "ძებნა",
        addToCart: "კალათაში დამატება",
        remove: "წაშლა",
        total: "ჯამი",
        emptyCart: "კალათა ცარიელია",
        continueShopping: "შოპინგის გაგრძელება",
        delivery: "მიწოდება",
        payment: "გადახდა",
        order: "შეკვეთის დადასტურება",
        manager: "მართვის პანელი"
    },

    en: {
        home: "Home",
        products: "Products",
        cart: "Cart",
        checkout: "Checkout",
        search: "Search",
        addToCart: "Add to cart",
        remove: "Remove",
        total: "Total",
        emptyCart: "Your cart is empty",
        continueShopping: "Continue shopping",
        delivery: "Delivery",
        payment: "Payment",
        order: "Confirm order",
        manager: "Manager Panel"
    },

    ru: {
        home: "Главная",
        products: "Товары",
        cart: "Корзина",
        checkout: "Оформление заказа",
        search: "Поиск",
        addToCart: "Добавить в корзину",
        remove: "Удалить",
        total: "Итого",
        emptyCart: "Корзина пуста",
        continueShopping: "Продолжить покупки",
        delivery: "Доставка",
        payment: "Оплата",
        order: "Подтвердить заказ",
        manager: "Панель управления"
    },

    de: {
        home: "Startseite",
        products: "Produkte",
        cart: "Warenkorb",
        checkout: "Kasse",
        search: "Suche",
        addToCart: "In den Warenkorb",
        remove: "Entfernen",
        total: "Gesamt",
        emptyCart: "Der Warenkorb ist leer",
        continueShopping: "Weiter einkaufen",
        delivery: "Lieferung",
        payment: "Zahlung",
        order: "Bestellung bestätigen",
        manager: "Manager-Panel"
    }
};


let currentLanguage =
    localStorage.getItem(LANGUAGE_KEY) || "ka";


function setLanguage(language) {

    if (!translations[language]) {
        return;
    }

    currentLanguage = language;

    localStorage.setItem(
        LANGUAGE_KEY,
        language
    );

    applyLanguage();
}


function translate(key) {

    return (
        translations[currentLanguage]?.[key] ||
        translations.ka[key] ||
        key
    );
}


function applyLanguage() {

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n"
                );

            element.textContent =
                translate(key);
        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            element.placeholder =
                translate(key);
        });


    document.documentElement.lang =
        currentLanguage;
}


document.addEventListener(
    "DOMContentLoaded",
    applyLanguage
);
