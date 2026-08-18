/* =========================================
   DoseCare
   SETTINGS PAGE LOGIC
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const backButton =
    document.getElementById("back-button");

const themeToggle =
    document.getElementById("theme-toggle");

const themeStatus =
    document.getElementById("theme-status");


/* =========================================
   THEME STORAGE
========================================= */

const THEME_STORAGE_KEY =
    "dosecareTheme";

/* =========================================
   THEME SETTINGS
========================================= */

function updateThemeUI(theme) {

    const isLight =
        theme === "light";


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
   INITIALIZE SETTINGS UI
========================================= */

updateThemeUI(
    getSavedTheme()
);


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


            saveGlobalTheme(
                newTheme
            );


            updateThemeUI(
                newTheme
            );

        }
    );

}
/* =========================================
   APPLY THEME
========================================= */

function applyTheme(theme) {

    const isLight =
        theme === "light";

    document.documentElement.classList.toggle(
        "light-mode",
        isLight
    );

    document.body.classList.toggle(
        "light-mode",
        isLight
    );


    /* -------------------------------------
       Toggle
    ------------------------------------- */

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


    /* -------------------------------------
       Status
    ------------------------------------- */

    if (themeStatus) {

        themeStatus.textContent =
            isLight
                ? "Light Mode"
                : "Dark Mode";

    }


    /* -------------------------------------
       Icon
    ------------------------------------- */

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
        THEME_STORAGE_KEY,
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

            saveTheme(newTheme);

            applyTheme(newTheme);

        }
    );

}


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
   INITIALIZE
========================================= */

applyTheme(
    getSavedTheme()
);
