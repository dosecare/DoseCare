/* =========================================
   DoseCare
   History Page Logic
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const historyList =
    document.getElementById(
        "history-list"
    );


const historyEmpty =
    document.getElementById(
        "history-empty"
    );


const historyCount =
    document.getElementById(
        "history-count"
    );


const clearHistory =
    document.getElementById(
        "clear-history"
    );


const backButton =
    document.getElementById(
        "back-button"
    );


const goCalculator =
    document.getElementById(
        "go-calculator"
    );


/* =========================================
   GET HISTORY
========================================= */

function getDoseHistory() {

    const saved =
        localStorage.getItem(
            "dosecareHistory"
        );


    if (!saved) {

        return [];

    }


    try {

        return JSON.parse(
            saved
        );

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
   FORMAT DATE
========================================= */

function formatHistoryDate(
    item
) {

    /*
        Use the original timestamp
        when available.
    */

    if (item.timestamp) {

        const date =
            new Date(
                item.timestamp
            );


        if (
            !Number.isNaN(
                date.getTime()
            )
        ) {

            return date.toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );

        }

    }


    return item.date || "Unknown date";

}


/* =========================================
   FORMAT TIME
========================================= */

function formatHistoryTime(
    item
) {

    if (item.timestamp) {

        const date =
            new Date(
                item.timestamp
            );


        if (
            !Number.isNaN(
                date.getTime()
            )
        ) {

            return date.toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

        }

    }


    return item.time || "Unknown time";

}


/* =========================================
   RENDER HISTORY
========================================= */

function renderHistory() {

    const history =
        getDoseHistory();


    historyList.innerHTML = "";


    historyCount.textContent =
        history.length;


    /*
        EMPTY
    */

    if (!history.length) {

        historyEmpty.classList.add(
            "show"
        );

        return;

    }


    historyEmpty.classList.remove(
        "show"
    );


    /*
        HISTORY CARDS
    */

    history.forEach(
        (item) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "history-card";


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
                                ${
                                    item.medicine ||
                                    "Unknown medicine"
                                }
                            </h3>

                        </div>

                    </div>


                    <div class="history-date">

                        <strong>
                            ${
                                formatHistoryDate(
                                    item
                                )
                            }
                        </strong>

                        <span>
                            ${
                                formatHistoryTime(
                                    item
                                )
                            }
                        </span>

                    </div>

                </div>


                <div class="history-dose">

                    <span>
                        Calculated Dose
                    </span>

                    <strong>
                        ${
                            item.dose ??
                            "—"
                        }
                        ${
                            item.unit ||
                            ""
                        }
                    </strong>

                </div>


                <div class="history-details">

                    ${
                        item.age !== undefined &&
                        item.age !== null &&
                        item.age !== ""
                            ? `
                                <div>
                                    <span>Age</span>
                                    <strong>
                                        ${item.age}
                                        ${item.ageUnit || ""}
                                    </strong>
                                </div>
                              `
                            : ""
                    }


                    ${
                        item.weight !== undefined &&
                        item.weight !== null &&
                        item.weight !== ""
                            ? `
                                <div>
                                    <span>Weight</span>
                                    <strong>
                                        ${item.weight} kg
                                    </strong>
                                </div>
                              `
                            : ""
                    }


                    ${
                        item.concentrationMg &&
                        item.concentrationMl
                            ? `
                                <div>
                                    <span>Concentration</span>
                                    <strong>
                                        ${item.concentrationMg}
                                        mg /
                                        ${item.concentrationMl}
                                        mL
                                    </strong>
                                </div>
                              `
                            : ""
                    }

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

if (clearHistory) {

    clearHistory.addEventListener(
        "click",
        () => {

            const history =
                getDoseHistory();


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
                "dosecareHistory"
            );


            renderHistory();

        }
    );

}


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
   GO TO CALCULATOR
========================================= */

if (goCalculator) {

    goCalculator.addEventListener(
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
