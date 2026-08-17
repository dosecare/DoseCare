/* =========================================
   DoseCare
   Help Page Logic
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const backButton =
    document.getElementById(
        "back-button"
    );


const helpSearch =
    document.getElementById(
        "help-search"
    );


const clearSearch =
    document.getElementById(
        "clear-help-search"
    );


const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


const topicCards =
    document.querySelectorAll(
        ".topic-card"
    );


const noResults =
    document.getElementById(
        "no-results"
    );


const goAsk =
    document.getElementById(
        "go-ask"
    );


/* =========================================
   BACK
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
   FAQ ACCORDION
========================================= */

faqItems.forEach(
    item => {

        const button =
            item.querySelector(
                ".faq-question"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            () => {

                const isOpen =
                    item.classList.contains(
                        "open"
                    );


                /*
                    Close other FAQ items.
                */

                faqItems.forEach(
                    other => {

                        other.classList.remove(
                            "open"
                        );

                    }
                );


                /*
                    Open selected item.
                */

                if (!isOpen) {

                    item.classList.add(
                        "open"
                    );

                }

            }
        );

    }
);


/* =========================================
   SEARCH HELP
========================================= */

function searchHelp() {

    const term =
        helpSearch.value
            .trim()
            .toLowerCase();


    let visibleCount = 0;


    faqItems.forEach(
        item => {

            const keywords =
                (
                    item.dataset.keywords ||
                    ""
                ).toLowerCase();


            const topic =
                (
                    item.dataset.topic ||
                    ""
                ).toLowerCase();


            const text =
                item.textContent
                    .toLowerCase();


            const matches =
                !term ||
                keywords.includes(term) ||
                topic.includes(term) ||
                text.includes(term);


            item.classList.toggle(
                "hidden",
                !matches
            );


            if (matches) {

                visibleCount++;

            }

        }
    );


    if (clearSearch) {

        clearSearch.style.display =
            term
                ? "block"
                : "none";

    }


    if (noResults) {

        noResults.classList.toggle(
            "show",
            visibleCount === 0
        );

    }

}


if (helpSearch) {

    helpSearch.addEventListener(
        "input",
        searchHelp
    );

}


/* =========================================
   CLEAR SEARCH
========================================= */

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            helpSearch.value = "";

            searchHelp();

            helpSearch.focus();

        }
    );

}


/* =========================================
   TOPIC BUTTONS
========================================= */

topicCards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                const target =
                    card.dataset.target;


                const matchingFAQ =
                    document.querySelector(
                        `.faq-item[data-topic="${target}"]`
                    );


                if (!matchingFAQ) {
                    return;
                }


                /*
                    Clear search first.
                */

                if (helpSearch) {

                    helpSearch.value = "";

                    searchHelp();

                }


                /*
                    Close all.
                */

                faqItems.forEach(
                    item => {

                        item.classList.remove(
                            "open"
                        );

                    }
                );


                /*
                    Open matching FAQ.
                */

                matchingFAQ.classList.add(
                    "open"
                );


                matchingFAQ.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );

    }
);


/* =========================================
   GO TO ASK
========================================= */

if (goAsk) {

    goAsk.addEventListener(
        "click",
        () => {

            window.location.href =
                "ask.html";

        }
    );

}
