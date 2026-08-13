const THEME_KEY = "tsvrilmani_theme";

const savedTheme =
    localStorage.getItem(THEME_KEY) || "light";


function applyTheme(theme) {

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    localStorage.setItem(
        THEME_KEY,
        theme
    );

    updateThemeButton(theme);
}


function toggleTheme() {

    const currentTheme =
        document.documentElement.getAttribute(
            "data-theme"
        ) || "light";

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    applyTheme(newTheme);
}


function updateThemeButton(theme) {

    const buttons =
        document.querySelectorAll(
            "[data-theme-toggle]"
        );

    buttons.forEach(button => {

        button.textContent =
            theme === "dark"
                ? "☀️"
                : "🌙";

        button.setAttribute(
            "aria-label",
            theme === "dark"
                ? "თეთრი რეჟიმი"
                : "შავი რეჟიმი"
        );
    });
}


document.documentElement.setAttribute(
    "data-theme",
    savedTheme
);


document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateThemeButton(
            savedTheme
        );


        document
            .querySelectorAll(
                "[data-theme-toggle]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    toggleTheme
                );

            });

    }
);
