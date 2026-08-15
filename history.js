/* =========================================
   DoseCare
   History Logic
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

const clearHistoryButton =
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

        return JSON.parse(saved);

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

function saveDoseHistory(history) {

    localStorage.setItem(
        "dosecareHistory",
        JSON.stringify(history)
    );

}


/* =========================================
   FORMAT DATE
========================================= */

function formatHistoryDate(dateValue) {

    const date =
        new Date(dateValue);


    if (Number.isNaN(date.getTime())) {

        return {
            date: "Unknown date",
            time: ""
        };

    }


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const year =
        date.getFullYear();


    let hours =
        date.getHours();


    const minutes =
        String(
            date.getMinutes()
        ).padStart(2, "0");


    const period =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    return {

        date:
            `${day}/${month}/${year}`,

        time:
            `${hours}:${minutes} ${period}`

    };

}


/* =========================================
   RENDER HISTORY
========================================= */

function renderHistory() {

    const history =
        getDoseHistory();


    historyList.innerHTML = "";


    historyCount.textContent =
        `${history.length} ${
            history.length === 1
                ? "calculation"
                : "calculations"
        }`;


    if (history.length === 0) {

        historyEmpty.classList.add(
            "show"
        );

        return;

    }


    historyEmpty.classList.remove(
        "show"
    );


    history.forEach(
        (item, index) => {

            const date =
                formatHistoryDate(
                    item.date
                );


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "history-card";


            card.innerHTML = `

                <div class="history-icon">
                    +
                </div>


                <div class="history-main">

                    <h3>
                        ${item.medicine || "Medicine"}
                    </h3>


                    <span class="history-class">
                        ${item.class || "Pediatric medicine"}
                    </span>


                    <div class="history-details">

                        ${
                            item.age
                                ? `
                                    <span class="history-detail">
                                        Age: ${item.age}
                                    </span>
                                  `
                                : ""
                        }


                        ${
                            item.weight
                                ? `
                                    <span class="history-detail">
                                        Weight: ${item.weight} kg
                                    </span>
                                  `
                                : ""
                        }


                        ${
                            item.concentration
                                ? `
                                    <span class="history-detail">
                                        ${item.concentration}
                                    </span>
                                  `
                                : ""
                        }

                    </div>


                    ${
                        item.dose
                            ? `
                                <div class="history-dose">
                                    Dose: ${item.dose}
                                </div>
                              `
                            : ""
                    }


                    <button
                        class="delete-history"
                        type="button"
                        data-index="${index}"
                    >
                        Delete
                    </button>

                </div>


                <div class="history-date">

                    <small>
                        Calculated on
                    </small>

                    <strong>
                        ${date.date}
                    </strong>

                    <small>
                        ${date.time}
                    </small>

                </div>

            `;


            historyList.appendChild(
                card
            );

        }
    );


    attachDeleteEvents();

}


/* =========================================
   DELETE ONE ITEM
========================================= */

function attachDeleteEvents() {

    const buttons =
        document.querySelectorAll(
            ".delete-history"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    const history =
                        getDoseHistory();


                    history.splice(
                        index,
                        1
                    );


                    saveDoseHistory(
                        history
                    );


                    renderHistory();

                }
            );

        }
    );

}


/* =========================================
   CLEAR ALL HISTORY
========================================= */

if (clearHistoryButton) {

    clearHistoryButton.addEventListener(
        "click",
        () => {

            const history =
                getDoseHistory();


            if (history.length === 0) {

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
   PARTICLES
========================================= */

const particlesContainer =
    document.getElementById(
        "particles"
    );


if (particlesContainer) {

    for (
        let i = 0;
        i < 55;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.classList.add(
            "particle"
        );


        const size =
            Math.random() * 2.5 + 1.5;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.animationDuration =
            `${Math.random() * 8 + 8}s, ${Math.random() * 3 + 2}s`;


        particle.style.animationDelay =
            `${Math.random() * 8}s, ${Math.random() * 3}s`;


        particlesContainer.appendChild(
            particle
        );

    }

}


/* =========================================
   INITIALIZE
========================================= */

renderHistory();
