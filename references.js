/* =========================================
   DoseCare
   REFERENCES PAGE LOGIC
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const backButton =
    document.getElementById(
        "back-button"
    );


const referenceSearch =
    document.getElementById(
        "reference-search"
    );


const clearSearch =
    document.getElementById(
        "clear-reference-search"
    );


const referenceCards =
    document.querySelectorAll(
        ".reference-card"
    );


const noResults =
    document.getElementById(
        "no-results"
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
   SEARCH REFERENCES
========================================= */

function searchReferences() {

    if (!referenceSearch) {

        return;

    }


    const term =
        referenceSearch.value
            .trim()
            .toLowerCase();


    let visibleCount = 0;


    referenceCards.forEach(
        card => {

            const keywords =
                (
                    card.dataset.keywords ||
                    ""
                ).toLowerCase();


            const text =
                card.textContent
                    .toLowerCase();


            const matches =
                !term ||
                keywords.includes(term) ||
                text.includes(term);


            card.classList.toggle(
                "hidden",
                !matches
            );


            if (matches) {

                visibleCount++;

            }

        }
    );


    /* -------------------------------------
       CLEAR BUTTON
    ------------------------------------- */

    if (clearSearch) {

        clearSearch.style.display =
            term
                ? "block"
                : "none";

    }


    /* -------------------------------------
       NO RESULTS
    ------------------------------------- */

    if (noResults) {

        noResults.classList.toggle(
            "show",
            visibleCount === 0
        );

    }

}


/* =========================================
   SEARCH EVENT
========================================= */

if (referenceSearch) {

    referenceSearch.addEventListener(
        "input",
        searchReferences
    );

}


/* =========================================
   CLEAR SEARCH
========================================= */

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            if (!referenceSearch) {

                return;

            }


            referenceSearch.value = "";


            searchReferences();


            referenceSearch.focus();

        }
    );

}


/* =========================================
   REFERENCE CARDS
========================================= */

referenceCards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                const url =
                    card.dataset.url;


                if (!url) {

                    return;

                }


                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }
);


/* =========================================
   KEYBOARD SUPPORT
========================================= */

if (referenceSearch) {

    referenceSearch.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                referenceSearch.value = "";

                searchReferences();

            }

        }
    );

}


/* =========================================
   INITIALIZE
========================================= */

searchReferences();
