/* =========================================
   DoseCare
   SETTINGS PAGE LOGIC
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const backButton =
    document.getElementById(
        "back-button"
    );


const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


const themeStatus =
    document.getElementById(
        "theme-status"
    );


/* =========================================
   BACK TO HOME
========================================= */

if (backButton) {

    backButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "index.html";

        }
    );

}


/* =========================================
   GET SAVED THEME
========================================= */

function getSavedTheme() {

    return (
        localStorage.getItem(
            "dosecareTheme"
        ) || "dark"
    );

}


/* =========================================
   APPLY THEME
========================================= */

function applyTheme(theme) {

    const isLight =
        theme === "light";


    document.body.classList.toggle(
        "light-mode",
        isLight
    );


    if (themeToggle) {

        themeToggle.classList.toggle(
            "light",
            isLight
        );


        themeToggle.setAttribute(
            "aria-pressed",
            String(isLight)
        );

    }


    if (themeStatus) {

        themeStatus.textContent =
            isLight
                ? "Light Mode"
                : "Dark Mode";

    }


    const themeIcon =
        document.querySelector(
            ".theme-toggle-icon"
        );


    if (themeIcon) {

        themeIcon.textContent =
            isLight
                ? "☀"
                : "☾";

    }

}


/* =========================================
   SAVE THEME
========================================= */

function saveTheme(theme) {

    localStorage.setItem(
        "dosecareTheme",
        theme
    );

}


/* =========================================
   TOGGLE THEME
========================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                getSavedTheme();


            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";


            saveTheme(
                newTheme
            );


            applyTheme(
                newTheme
            );

        }
    );

}


/* =========================================
   INITIALIZE
========================================= */

applyTheme(
    getSavedTheme()
);
