/* =========================================
   DoseCare
   ASK PAGE LOGIC
========================================= */


/* =========================================
   TELEGRAM
========================================= */

const telegramButton =
    document.getElementById(
        "telegram-button"
    );


if (telegramButton) {

    telegramButton.addEventListener(
        "click",
        () => {

            window.open(
                "https://t.me/ph1_dk",
                "_blank"
            );

        }
    );

}


/* =========================================
   BACK TO HOME
========================================= */

const backButton =
    document.getElementById(
        "back-button"
    );


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
   HELP
========================================= */

const helpButton =
    document.getElementById(
        "help-button"
    );


if (helpButton) {

    helpButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "help.html";

        }
    );

}
