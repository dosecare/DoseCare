/* =========================================
   DoseCare
   Ask Page Logic
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const backButton =
    document.getElementById(
        "back-button"
    );


const category =
    document.getElementById(
        "question-category"
    );


const medicine =
    document.getElementById(
        "ask-medicine"
    );


const age =
    document.getElementById(
        "ask-age"
    );


const ageUnit =
    document.getElementById(
        "ask-age-unit"
    );


const weight =
    document.getElementById(
        "ask-weight"
    );


const question =
    document.getElementById(
        "question"
    );


const characterCount =
    document.getElementById(
        "character-count"
    );


const validation =
    document.getElementById(
        "ask-validation"
    );


const reviewButton =
    document.getElementById(
        "review-question"
    );


const clearButton =
    document.getElementById(
        "clear-question"
    );


const review =
    document.getElementById(
        "question-review"
    );


const reviewContent =
    document.getElementById(
        "review-content"
    );


const closeReview =
    document.getElementById(
        "close-review"
    );


const editQuestion =
    document.getElementById(
        "edit-question"
    );


const saveQuestion =
    document.getElementById(
        "save-question"
    );


const quickQuestions =
    document.querySelectorAll(
        ".quick-question"
    );


/* =========================================
   STORAGE
========================================= */

const ASK_STORAGE_KEY =
    "dosecareQuestions";


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
   CHARACTER COUNT
========================================= */

if (question) {

    question.addEventListener(
        "input",
        () => {

            characterCount.textContent =
                question.value.length;

        }
    );

}


/* =========================================
   VALIDATION
========================================= */

function showValidation(message) {

    if (!validation) {
        return;
    }


    const text =
        validation.querySelector("p");


    if (text) {

        text.textContent =
            message;

    }


    validation.classList.add(
        "show"
    );

}


function hideValidation() {

    if (!validation) {
        return;
    }


    validation.classList.remove(
        "show"
    );

}


/* =========================================
   CLEAR
========================================= */

function clearQuestionForm() {

    if (category) {
        category.value = "";
    }


    if (medicine) {
        medicine.value = "";
    }


    if (age) {
        age.value = "";
    }


    if (ageUnit) {
        ageUnit.value = "years";
    }


    if (weight) {
        weight.value = "";
    }


    if (question) {
        question.value = "";
    }


    if (characterCount) {
        characterCount.textContent = "0";
    }


    hideValidation();


    if (review) {

        review.classList.remove(
            "show"
        );

    }

}


/* =========================================
   CLEAR BUTTON
========================================= */

if (clearButton) {

    clearButton.addEventListener(
        "click",
        clearQuestionForm
    );

}


/* =========================================
   BUILD REVIEW
========================================= */

function buildReview() {

    hideValidation();


    const questionText =
        question
            ? question.value.trim()
            : "";


    if (!category.value) {

        showValidation(
            "Please select a question type."
        );

        return false;

    }


    if (!questionText) {

        showValidation(
            "Please write your question first."
        );

        return false;

    }


    if (questionText.length < 5) {

        showValidation(
            "Please provide a little more detail."
        );

        return false;

    }


    if (
        age.value &&
        Number(age.value) < 0
    ) {

        showValidation(
            "Please enter a valid age."
        );

        return false;

    }


    if (
        weight.value &&
        Number(weight.value) <= 0
    ) {

        showValidation(
            "Please enter a valid weight."
        );

        return false;

    }


    const categoryText =
        category.options[
            category.selectedIndex
        ].textContent;


    const medicineText =
        medicine.value.trim() ||
        "Not provided";


    let patientText =
        "Not provided";


    if (
        age.value ||
        weight.value
    ) {

        const parts = [];


        if (age.value) {

            parts.push(
                `${age.value} ${ageUnit.value}`
            );

        }


        if (weight.value) {

            parts.push(
                `${weight.value} kg`
            );

        }


        patientText =
            parts.join(" · ");

    }


    reviewContent.innerHTML = `

        <div class="review-item">

            <span>
                QUESTION TYPE
            </span>

            <strong>
                ${categoryText}
            </strong>

        </div>


        <div class="review-item">

            <span>
                MEDICINE
            </span>

            <strong>
                ${medicineText}
            </strong>

        </div>


        <div class="review-item">

            <span>
                PATIENT
            </span>

            <strong>
                ${patientText}
            </strong>

        </div>


        <div class="review-item">

            <span>
                QUESTION
            </span>

            <strong>
                ${questionText}
            </strong>

        </div>

    `;


    review.classList.add(
        "show"
    );


    review.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    return true;

}


/* =========================================
   REVIEW BUTTON
========================================= */

if (reviewButton) {

    reviewButton.addEventListener(
        "click",
        buildReview
    );

}


/* =========================================
   CLOSE REVIEW
========================================= */

function hideReview() {

    if (review) {

        review.classList.remove(
            "show"
        );

    }

}


if (closeReview) {

    closeReview.addEventListener(
        "click",
        hideReview
    );

}


if (editQuestion) {

    editQuestion.addEventListener(
        "click",
        () => {

            hideReview();


            question.focus();

        }
    );

}


/* =========================================
   SAVE QUESTION
========================================= */

function getSavedQuestions() {

    try {

        const saved =
            localStorage.getItem(
                ASK_STORAGE_KEY
            );


        if (!saved) {
            return [];
        }


        const parsed =
            JSON.parse(saved);


        return Array.isArray(parsed)
            ? parsed
            : [];

    }
    catch (error) {

        console.error(
            "Question loading error:",
            error
        );

        return [];

    }

}


if (saveQuestion) {

    saveQuestion.addEventListener(
        "click",
        () => {

            if (
                !buildReview()
            ) {

                return;

            }


            const questions =
                getSavedQuestions();


            questions.unshift({

                id:
                    Date.now(),

                category:
                    category.value,

                medicine:
                    medicine.value.trim(),

                age:
                    age.value,

                ageUnit:
                    ageUnit.value,

                weight:
                    weight.value,

                question:
                    question.value.trim(),

                timestamp:
                    new Date().toISOString()

            });


            localStorage.setItem(
                ASK_STORAGE_KEY,
                JSON.stringify(
                    questions.slice(
                        0,
                        30
                    )
                )
            );


            saveQuestion.textContent =
                "Saved ✓";


            setTimeout(
                () => {

                    saveQuestion.innerHTML =
                        "Save Question <span>✓</span>";

                },
                1200
            );

        }
    );

}


/* =========================================
   QUICK QUESTIONS
========================================= */

quickQuestions.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const text =
                    button.dataset.question;


                const selectedCategory =
                    button.dataset.category;


                if (category) {

                    category.value =
                        selectedCategory;

                }


                if (question) {

                    question.value =
                        text;

                    characterCount.textContent =
                        text.length;

                }


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });


                setTimeout(
                    () => {

                        question.focus();

                    },
                    400
                );

            }
        );

    }
);
