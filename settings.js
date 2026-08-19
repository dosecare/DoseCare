/* =========================================
   DoseCare
   SETTINGS PAGE LOGIC
========================================= */


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
