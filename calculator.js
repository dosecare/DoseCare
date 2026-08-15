/* =========================================
   DoseCare
   Pediatric Dose Calculator
   Calculator Logic
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const conditionSelect =
    document.getElementById("condition");

const medicineSelect =
    document.getElementById("medicine-select");

const medicineSearch =
    document.getElementById("medicine");

const medicineResults =
    document.getElementById("medicine-results");

const clearMedicine =
    document.getElementById("clear-medicine");

const ageInput =
    document.getElementById("age");

const ageUnit =
    document.getElementById("age-unit");

const weightInput =
    document.getElementById("weight");

const concentrationValue =
    document.getElementById("concentration-value");

const concentrationVolume =
    document.getElementById("concentration-volume");

const calculateButton =
    document.getElementById("calculate-button");

const validationMessage =
    document.getElementById("validation-message");

const resultCard =
    document.getElementById("result-card");

const doseResult =
    document.getElementById("dose-result");

const doseUnit =
    document.getElementById("dose-unit");

const resultDetails =
    document.getElementById("result-details");

const backButton =
    document.getElementById("back-button");


/* =========================================
   CURRENT STATE
========================================= */

let selectedMedicine = null;


/* =========================================
   HISTORY STORAGE KEY
========================================= */

const HISTORY_STORAGE_KEY =
    "dosecareHistory";


/* =========================================
   CONDITIONS
========================================= */

function getAllConditions() {

    const conditionSet =
        new Set();

    medicines.forEach(
        (medicine) => {

            if (!medicine.conditions) {
                return;
            }

            medicine.conditions.forEach(
                (condition) => {

                    conditionSet.add(
                        condition
                    );

                }
            );

        }
    );

    return Array.from(
        conditionSet
    ).sort();

}


/* =========================================
   INITIALIZE CONDITIONS
========================================= */

function initializeConditions() {

    if (!conditionSelect) {
        return;
    }

    const allConditions =
        getAllConditions();

    allConditions.forEach(
        (condition) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                condition;

            option.textContent =
                formatConditionName(
                    condition
                );

            conditionSelect.appendChild(
                option
            );

        }
    );

}


/* =========================================
   FORMAT CONDITION NAME
========================================= */

function formatConditionName(
    condition
) {

    return condition
        .split(" ")
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

}


/* =========================================
   GET FILTERED MEDICINES
========================================= */

function getFilteredMedicines() {

    const selectedCondition =
        conditionSelect
            ? conditionSelect.value
            : "";

    if (!selectedCondition) {

        return medicines;

    }

    return medicines.filter(
        (medicine) => {

            return (
                medicine.conditions &&
                medicine.conditions.includes(
                    selectedCondition
                )
            );

        }
    );

}


/* =========================================
   POPULATE MEDICINE SELECT
========================================= */

function populateMedicineSelect() {

    if (!medicineSelect) {
        return;
    }

    const availableMedicines =
        getFilteredMedicines();

    medicineSelect.innerHTML = "";


    const defaultOption =
        document.createElement(
            "option"
        );

    defaultOption.value = "";

    defaultOption.textContent =
        "Select a medicine";

    medicineSelect.appendChild(
        defaultOption
    );


    availableMedicines.forEach(
        (medicine) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                medicine.id;

            option.textContent =
                medicine.genericName ||
                medicine.name;

            medicineSelect.appendChild(
                option
            );

        }
    );


    medicineSelect.disabled = false;

}


/* =========================================
   CONDITION CHANGE
========================================= */

if (conditionSelect) {

    conditionSelect.addEventListener(
        "change",
        () => {

            populateMedicineSelect();

            if (
                selectedMedicine &&
                selectedMedicine.conditions &&
                conditionSelect.value &&
                !selectedMedicine.conditions.includes(
                    conditionSelect.value
                )
            ) {

                clearSelectedMedicine();

            }

        }
    );

}


/* =========================================
   MEDICINE SELECT CHANGE
========================================= */

if (medicineSelect) {

    medicineSelect.addEventListener(
        "change",
        () => {

            const medicineId =
                medicineSelect.value;

            if (!medicineId) {

                clearSelectedMedicine();

                return;

            }


            const medicine =
                medicines.find(
                    (item) =>
                        String(item.id) ===
                        String(medicineId)
                );


            selectMedicine(
                medicine
            );

        }
    );

}


/* =========================================
   SELECT MEDICINE
========================================= */

function selectMedicine(
    medicine
) {

    if (!medicine) {
        return;
    }

    selectedMedicine =
        medicine;


    const medicineName =
        medicine.genericName ||
        medicine.name ||
        "";


    if (medicineSearch) {

        medicineSearch.value =
            medicineName;

    }


    if (medicineSelect) {

        medicineSelect.value =
            medicine.id;

    }


    if (clearMedicine) {

        clearMedicine.style.display =
            "flex";

    }


    hideSearchResults();

    hideValidation();

    hideResult();

}


/* =========================================
   CLEAR SELECTED MEDICINE
========================================= */

function clearSelectedMedicine() {

    selectedMedicine =
        null;


    if (medicineSelect) {

        medicineSelect.value = "";

    }


    if (medicineSearch) {

        medicineSearch.value = "";

    }


    if (clearMedicine) {

        clearMedicine.style.display =
            "none";

    }

}


/* =========================================
   MEDICINE SEARCH
========================================= */

if (medicineSearch) {

    medicineSearch.addEventListener(
        "input",
        () => {

            const searchTerm =
                medicineSearch.value
                    .trim()
                    .toLowerCase();


            if (clearMedicine) {

                clearMedicine.style.display =
                    searchTerm
                        ? "flex"
                        : "none";

            }


            if (!searchTerm) {

                hideSearchResults();

                return;

            }


            const filteredMedicines =
                medicines.filter(
                    (medicine) => {

                        const name =
                            (
                                medicine.genericName ||
                                medicine.name ||
                                ""
                            ).toLowerCase();


                        const brands =
                            medicine.brandNames ||
                            medicine.brands ||
                            [];


                        const brandMatch =
                            brands.some(
                                (brand) =>
                                    brand
                                        .toLowerCase()
                                        .includes(
                                            searchTerm
                                        )
                            );


                        return (
                            name.includes(
                                searchTerm
                            ) ||
                            brandMatch
                        );

                    }
                );


            showSearchResults(
                filteredMedicines
            );

        }
    );

}


/* =========================================
   SHOW SEARCH RESULTS
========================================= */

function showSearchResults(
    results
) {

    if (!medicineResults) {
        return;
    }


    medicineResults.innerHTML = "";


    if (!results.length) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "medicine-result-item";

        empty.innerHTML = `
            <span>
                No medicine found
            </span>
        `;

        medicineResults.appendChild(
            empty
        );

        medicineResults.style.display =
            "block";

        return;

    }


    results.forEach(
        (medicine) => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "medicine-result-item";


            const name =
                medicine.genericName ||
                medicine.name ||
                "Medicine";


            const drugClass =
                medicine.drugClass ||
                medicine.class ||
                [];


            const classText =
                Array.isArray(drugClass)
                    ? drugClass.join(" · ")
                    : drugClass;


            item.innerHTML = `
                <strong>
                    ${name}
                </strong>

                <span>
                    ${classText}
                </span>
            `;


            item.addEventListener(
                "click",
                () => {

                    selectMedicine(
                        medicine
                    );

                }
            );


            medicineResults.appendChild(
                item
            );

        }
    );


    medicineResults.style.display =
        "block";

}


/* =========================================
   HIDE SEARCH RESULTS
========================================= */

function hideSearchResults() {

    if (!medicineResults) {
        return;
    }

    medicineResults.style.display =
        "none";

}


/* =========================================
   CLEAR SEARCH
========================================= */

if (clearMedicine) {

    clearMedicine.addEventListener(
        "click",
        () => {

            clearSelectedMedicine();

            hideSearchResults();

        }
    );

}


/* =========================================
   CLOSE SEARCH
========================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            medicineSearch &&
            medicineResults &&
            !medicineSearch.contains(
                event.target
            ) &&
            !medicineResults.contains(
                event.target
            )
        ) {

            hideSearchResults();

        }

    }
);


/* =========================================
   VALIDATION
========================================= */

function showValidation(
    message
) {

    if (!validationMessage) {
        return;
    }


    const messageText =
        validationMessage.querySelector(
            "p"
        );


    if (messageText) {

        messageText.textContent =
            message;

    }


    validationMessage.style.display =
        "flex";

}


function hideValidation() {

    if (!validationMessage) {
        return;
    }

    validationMessage.style.display =
        "none";

}


/* =========================================
   RESULT
========================================= */

function hideResult() {

    if (!resultCard) {
        return;
    }

    resultCard.style.display =
        "none";

}


function showResult() {

    if (!resultCard) {
        return;
    }

    resultCard.style.display =
        "block";

}


/* =========================================
   HISTORY
========================================= */

/*
    Save every successful calculation.

    The date and time are generated automatically
    from the user's device.
*/

function saveCalculationToHistory(
    calculation
) {

    let history = [];


    const saved =
        localStorage.getItem(
            HISTORY_STORAGE_KEY
        );


    if (saved) {

        try {

            history =
                JSON.parse(saved);

        }
        catch (error) {

            console.error(
                "History loading error:",
                error
            );

            history = [];

        }

    }


    const now =
        new Date();


    const historyItem = {

        id:
            Date.now(),


        medicine:
            calculation.medicine,


        dose:
            calculation.dose,


        doseUnit:
            calculation.doseUnit,


        age:
            calculation.age,


        ageUnit:
            calculation.ageUnit,


        weight:
            calculation.weight,


        concentration:
            calculation.concentration,


        date:
            now.toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            ),


        time:
            now.toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            ),


        timestamp:
            now.toISOString()

    };


    history.unshift(
        historyItem
    );


    /*
        Keep the latest 100 calculations.
    */

    history =
        history.slice(
            0,
            100
        );


    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(history)
    );


    console.log(
        "Calculation saved to History:",
        historyItem
    );

}


/* =========================================
   GET HISTORY
========================================= */

function getCalculationHistory() {

    const saved =
        localStorage.getItem(
            HISTORY_STORAGE_KEY
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
            "History parsing error:",
            error
        );

        return [];

    }

}


/* =========================================
   CALCULATE DOSE
========================================= */

if (calculateButton) {

    calculateButton.addEventListener(
        "click",
        calculateDose
    );

}


function calculateDose() {

    hideValidation();

    hideResult();


    /* -------------------------------------
       1. MEDICINE
    ------------------------------------- */

    if (!selectedMedicine) {

        showValidation(
            "Please select a medicine before calculating the dose."
        );

        return;

    }


    /* -------------------------------------
       2. PATIENT INFORMATION
    ------------------------------------- */

    const age =
        ageInput
            ? parseFloat(
                ageInput.value
            )
            : NaN;


    const weight =
        weightInput
            ? parseFloat(
                weightInput.value
            )
            : NaN;


    const hasAge =
        Number.isFinite(age);


    const hasWeight =
        Number.isFinite(weight);


    if (!hasAge && !hasWeight) {

        showValidation(
            "Please enter the patient's age, weight, or both."
        );

        return;

    }


    if (hasAge && age < 0) {

        showValidation(
            "Please enter a valid age."
        );

        return;

    }


    if (hasWeight && weight <= 0) {

        showValidation(
            "Please enter a valid weight."
        );

        return;

    }


    /* -------------------------------------
       3. CONCENTRATION
    ------------------------------------- */

    const concentrationMg =
        concentrationValue
            ? parseFloat(
                concentrationValue.value
            )
            : NaN;


    const concentrationMl =
        concentrationVolume
            ? parseFloat(
                concentrationVolume.value
            )
            : NaN;


    if (
        !Number.isFinite(
            concentrationMg
        ) ||
        !Number.isFinite(
            concentrationMl
        ) ||
        concentrationMg <= 0 ||
        concentrationMl <= 0
    ) {

        showValidation(
            "Please enter a valid medicine concentration."
        );

        return;

    }


    /* -------------------------------------
       4. DOSING RULE
    ------------------------------------- */

    const dosing =
        selectedMedicine.dosing;


    if (!dosing) {

        showValidation(
            "A verified dosing rule has not been configured for this medicine yet."
        );

        return;

    }


    /*
        IMPORTANT:
        We do NOT invent a dose here.

        The verified dosing rule from medicines.js
        must calculate the actual dose.
    */

    let calculatedDose = null;


    /*
        Supported rule format:
        dosing.calculateDose(...)
    */

    if (
        typeof dosing.calculateDose ===
        "function"
    ) {

        calculatedDose =
            dosing.calculateDose({

                age:
                    age,

                ageUnit:
                    ageUnit
                        ? ageUnit.value
                        : "",

                weight:
                    weight,

                concentrationMg:
                    concentrationMg,

                concentrationMl:
                    concentrationMl

            });

    }


    /*
        If no verified calculation function
        exists, stop safely.
    */

    if (
        calculatedDose === null ||
        calculatedDose === undefined ||
        !Number.isFinite(
            Number(calculatedDose)
        )
    ) {

        showValidation(
            "The verified dosing rule for this medicine is not ready yet."
        );

        return;

    }


    calculatedDose =
        Number(
            calculatedDose
        );


    /* -------------------------------------
       5. RESULT
    ------------------------------------- */

    if (doseResult) {

        doseResult.textContent =
            calculatedDose;

    }


    if (doseUnit) {

        doseUnit.textContent =
            dosing.unit ||
            "mg";

    }


    if (resultDetails) {

        resultDetails.innerHTML = `

            <div>
                <span>Medicine</span>
                <strong>
                    ${
                        selectedMedicine.genericName ||
                        selectedMedicine.name
                    }
                </strong>
            </div>

            <div>
                <span>Age</span>
                <strong>
                    ${
                        hasAge
                            ? `${age} ${
                                ageUnit
                                    ? ageUnit.value
                                    : ""
                              }`
                            : "—"
                    }
                </strong>
            </div>

            <div>
                <span>Weight</span>
                <strong>
                    ${
                        hasWeight
                            ? `${weight} kg`
                            : "—"
                    }
                </strong>
            </div>

            <div>
                <span>Concentration</span>
                <strong>
                    ${concentrationMg} mg /
                    ${concentrationMl} mL
                </strong>
            </div>

        `;

    }


    showResult();


    /* -------------------------------------
       6. SAVE TO HISTORY
    ------------------------------------- */

    saveCalculationToHistory({

        medicine:
            selectedMedicine.genericName ||
            selectedMedicine.name,

        dose:
            calculatedDose,

        doseUnit:
            dosing.unit ||
            "mg",

        age:
            hasAge
                ? age
                : "",

        ageUnit:
            ageUnit
                ? ageUnit.value
                : "",

        weight:
            hasWeight
                ? weight
                : "",

        concentration:
            `${concentrationMg} mg / ${concentrationMl} mL`

    });


    console.log(
        "Dose calculated and saved to History."
    );

}


/* =========================================
   BACK BUTTON
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

initializeConditions();

populateMedicineSelect();
