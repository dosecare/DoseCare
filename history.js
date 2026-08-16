/* =========================================
   DoseCare
   Calculation History
   History Logic
========================================= */


/* =========================================
   STORAGE
========================================= */

const HISTORY_STORAGE_KEY =
    "dosecareHistory";


/* =========================================
   DOM ELEMENTS
========================================= */

const historyList =
    document.getElementById(
        "history-list"
    );


const historyCount =
    document.getElementById(
        "history-count"
    );


const emptyState =
    document.getElementById(
        "history-empty"
    );


const clearHistoryButton =
    document.getElementById(
        "clear-history"
    );


const backButton =
    document.getElementById(
        "history-back"
    );


const startCalculatorButton =
    document.getElementById(
        "start-history-calculator"
    );


/* =========================================
   GET HISTORY
========================================= */

function getHistory() {

    const saved =
        localStorage.getItem(
            HISTORY_STORAGE_KEY
        );


    if (!saved) {

        return [];

    }


    try {

        const history =
            JSON.parse(saved);


        if (!Array.isArray(history)) {

            return [];

        }


        return history;

    }
    catch (error) {

        console.error(
            "History loading error:",
            error
        );

        return [];

    }

}


/* =========================================
   SAVE HISTORY
========================================= */

function saveHistory(
    history
) {

    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(history)
    );

}


/* =========================================
   FORMAT DATE
========================================= */

function formatHistoryDate(
    item
) {

    /*
        New records already contain
        a formatted date.

        We keep this fallback for
        older records.
    */

    if (item.date) {

        return item.date;

    }


    if (item.timestamp) {

        const date =
            new Date(
                item.timestamp
            );


        return date.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

    }


    return "—";

}


/* =========================================
   FORMAT TIME
========================================= */

function formatHistoryTime(
    item
) {

    if (item.time) {

        return item.time;

    }


    if (item.timestamp) {

        const date =
            new Date(
                item.timestamp
            );


        return date.toLocaleTimeString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    return "—";

}


/* =========================================
   FORMAT VALUE
========================================= */

function formatValue(
    value,
    fallback = "—"
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return fallback;

    }


    return value;

}


/* =========================================
   RENDER HISTORY
========================================= */

function renderHistory() {

    if (!historyList) {

        return;

    }


    const history =
        getHistory();


    /*
        Update counter
    */

    if (historyCount) {

        historyCount.textContent =
            history.length;

    }


    /*
        Empty state
    */

    if (!history.length) {

        historyList.innerHTML = "";


        if (emptyState) {

            emptyState.classList.add(
                "show"
            );

        }


        return;

    }


    /*
        Hide empty state
    */

    if (emptyState) {

        emptyState.classList.remove(
            "show"
        );

    }


    historyList.innerHTML = "";


    history.forEach(
        (item) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "history-card";


            const medicine =
                formatValue(
                    item.medicine,
                    "Medicine"
                );


            const dose =
                formatValue(
                    item.dose
                );


            const doseUnit =
                formatValue(
                    item.doseUnit,
                    "mg"
                );


            const age =
                item.age !== undefined &&
                item.age !== ""
                    ? `${item.age} ${
                        formatValue(
                            item.ageUnit,
                            ""
                        )
                      }`
                    : "—";


            const weight =
                item.weight !== undefined &&
                item.weight !== ""
                    ? `${item.weight} kg`
                    : "—";


            const concentration =
                formatValue(
                    item.concentration
                );


            const date =
                formatHistoryDate(
                    item
                );


            const time =
                formatHistoryTime(
                    item
                );


            card.innerHTML = `

                <div class="history-card-top">


                    <div class="history-medicine">

                        <div class="history-medicine-icon">
                            +
                        </div>


                        <div>

                            <span>
                                MEDICINE
                            </span>

                            <h3>
                                ${medicine}
                            </h3>

                        </div>

                    </div>


                    <div class="history-date">

                        <strong>
                            ${date}
                        </strong>

                        <span>
                            ${time}
                        </span>

                    </div>


                </div>



                <div class="history-dose">

                    <span>
                        Calculated Dose
                    </span>

                    <strong>
                        ${dose}
                        ${doseUnit}
                    </strong>

                </div>



                <div class="history-details">


                    <div>

                        <span>
                            Age
                        </span>

                        <strong>
                            ${age}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Weight
                        </span>

                        <strong>
                            ${weight}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Concentration
                        </span>

                        <strong>
                            ${concentration}
                        </strong>

                    </div>


                </div>

            `;


            historyList.appendChild(
                card
            );

        }
    );

}


/* =========================================
   CLEAR HISTORY
========================================= */

function clearHistory() {

    const history =
        getHistory();


    if (!history.length) {

        return;

    }


    const confirmed =
        window.confirm(
            "Are you sure you want to clear all calculation history?"
        );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(
        HISTORY_STORAGE_KEY
    );


    renderHistory();

}


/* =========================================
   CLEAR BUTTON
========================================= */

if (clearHistoryButton) {

    clearHistoryButton.addEventListener(
        "click",
        clearHistory
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
   START CALCULATOR
========================================= */

if (startCalculatorButton) {

    startCalculatorButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "calculator.html";

        }
    );

}


/* =========================================
   AUTO REFRESH
========================================= */

/*
    If another tab/page changes
    the history, update this page.
*/

window.addEventListener(
    "storage",
    (event) => {

        if (
            event.key ===
            HISTORY_STORAGE_KEY
        ) {

            renderHistory();

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderHistory();

    }
);
