/* =========================================
   DOSECARE
   THEME SYSTEM
   Default = Dark Mode
========================================= */

const themeToggle = document.getElementById("theme-toggle");
const themeStatus = document.getElementById("theme-status");


// =========================================
// APPLY THEME
// =========================================

function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light-mode");

    } else {

        document.body.classList.remove("light-mode");

    }

    updateThemeUI(theme);
}


// =========================================
// UPDATE THEME UI
// =========================================

function updateThemeUI(theme) {

    if (!themeToggle) return;

    const isLight = theme === "light";

    themeToggle.classList.toggle(
        "light",
        isLight
    );

    themeToggle.setAttribute(
        "aria-pressed",
        isLight ? "true" : "false"
    );


    if (themeStatus) {

        themeStatus.textContent =
            isLight
                ? "Light Mode"
                : "Dark Mode";

    }


    const icon =
        themeToggle.querySelector(
            ".theme-toggle-icon"
        );

    if (icon) {

        icon.textContent =
            isLight
                ? "☀"
                : "☾";

    }

}


// =========================================
// LOAD SAVED THEME
// =========================================

const savedTheme =
    localStorage.getItem("dosecare-theme");


// =========================================
// DEFAULT = DARK
// =========================================

if (savedTheme === "light") {

    applyTheme("light");

} else {

    applyTheme("dark");

}


// =========================================
// TOGGLE THEME
// =========================================

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            const isCurrentlyLight =
                document.body.classList.contains(
                    "light-mode"
                );

            const newTheme =
                isCurrentlyLight
                    ? "dark"
                    : "light";


            applyTheme(newTheme);


            localStorage.setItem(
                "dosecare-theme",
                newTheme
            );

        }
    );

}
