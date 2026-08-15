/* =========================================
   DoseCare
   History Logic
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const historyContainer =
    document.getElementById(
        "history-container"
    );


const emptyHistory =
    document.getElementById(
        "empty-history"
    );


const clearHistoryButton =
    document.getElementById(
        "clear-history"
    );


const backHome =
    document.getElementById(
        "back-home"
    );


const startCalculator =
    document.getElementById(
        "start-calculator"
    );


/* =========================================
   GET HISTORY
========================================= */

function getHistory() {

    const savedHistory =
        localStorage.getItem(
            "dosecareHistory"
        );


    if (!savedHistory) {

        return [];

    }


    try {

        return JSON.parse(
            savedHistory
        );

    } catch (error) {

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
        "dosecareHistory",
        JSON.stringify(history)
    );

}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(
    dateValue
) {

    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date.toLocaleString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


/* =========================================
   RENDER HISTORY
========================================= */

function renderHistory() {

    const history =
        getHistory();


    historyContainer.innerHTML =
        "";


    if (
        history.length === 0
    ) {

        emptyHistory.style.display =
            "flex";

        clearHistoryButton.style.display =
            "none";

        return;

    }


    emptyHistory.style.display =
        "none";

    clearHistoryButton.style.display =
        "block";


    history.forEach(
        (record, index) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "history-card";


            card.innerHTML = `

                <div class="history-icon">
                    💊
                </div>


                <div class="history-info">

                    <div class="history-title-row">

                        <h3>
                            ${record.medicine || "Medicine"}
                        </h3>

                        <span class="history-date">
                            ${formatDate(record.date)}
                        </span>

                    </div>


                    <div class="history-details">

                        ${
                            record.age
                                ? `
                                <span>
                                    👶 ${record.age}
                                </span>
                                `
                                : ""
                        }


                        ${
                            record.weight
                                ? `
                                <span>
                                    ⚖ ${record.weight} kg
                                </span>
                                `
                                : ""
                        }


                        ${
                            record.concentration
                                ? `
                                <span>
                                    🧪 ${record.concentration}
                                </span>
                                `
                                : ""
                        }

                    </div>


                    ${
                        record.result
                            ? `
                            <div class="history-result">
                                <small>
                                    Calculated Dose
                                </small>

                                <strong>
                                    ${record.result}
                                </strong>
                            </div>
                            `
                            : ""
                    }

                </div>


                <button
                    class="delete-history"
                    type="button"
                    data-index="${index}"
                    aria-label="Delete calculation"
                >
                    ×
                </button>

            `;


            historyContainer.appendChild(
                card
            );

        }
    );


    attachDeleteEvents();

}


/* =========================================
   DELETE ONE RECORD
========================================= */

function attachDeleteEvents() {

    document
        .querySelectorAll(
            ".delete-history"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        deleteHistoryItem(
                            index
                        );

                    }
                );

            }
        );

}


/* =========================================
   DELETE HISTORY ITEM
========================================= */

function deleteHistoryItem(
    index
) {

    const history =
        getHistory();


    history.splice(
        index,
        1
    );


    saveHistory(
        history
    );


    renderHistory();

}


/* =========================================
   CLEAR ALL HISTORY
========================================= */

if (
    clearHistoryButton
) {

    clearHistoryButton.addEventListener(
        "click",
        () => {

            const history =
                getHistory();


            if (
                history.length === 0
            ) {

                return;

            }


            const confirmed =
                confirm(
                    "Clear all calculation history?"
                );


            if (!confirmed) {

                return;

            }


            localStorage.removeItem(
                "dosecareHistory"
            );


            renderHistory();

        }
    );

}


/* =========================================
   BACK TO HOME
========================================= */

if (backHome) {

    backHome.addEventListener(
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

if (startCalculator) {

    startCalculator.addEventListener(
        "click",
        () => {

            window.location.href =
                "calculator.html";

        }
    );

}


/* =========================================
   INITIALIZE
========================================= */

renderHistory();
