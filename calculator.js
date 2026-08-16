/* =========================================
   DoseCare
   Pediatric Dose Calculator
   Calculator Logic
========================================= */


/* =========================================
   STORAGE
========================================= */

const HISTORY_STORAGE_KEY =
    "dosecareHistory";


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
   CONDITIONS
========================================= */

function getAllConditions() {

    const conditionSet =
        new Set();


    medicines.forEach(
        medicine => {

            if (
                !Array.isArray(
                    medicine.conditions
                )
            ) {

                return;

            }


            medicine.conditions.forEach(
                condition => {

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


    /*
        Prevent duplicate options
        if the function runs again.
    */

    conditionSelect.innerHTML = `
        <option value="">
            Select a condition
        </option>
    `;


    const allConditions =
        getAllConditions();


    allConditions.forEach(
        condition => {

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

    return String(condition)
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
        medicine =>
            Array.isArray(
                medicine.conditions
            ) &&
            medicine.conditions.includes(
                selectedCondition
            )
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
        medicine => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                String(
                    medicine.id
                );


            option.textContent =
                getMedicineName(
                    medicine
                );


            medicineSelect.appendChild(
                option
            );

        }
    );


    medicineSelect.disabled =
        false;

}


/* =========================================
   CONDITION CHANGE
========================================= */

if (conditionSelect) {

    conditionSelect.addEventListener(
        "change",
        () => {

            populateMedicineSelect();


            /*
                Clear selected medicine
                if it doesn't belong to
                the selected condition.
            */

            if (
                selectedMedicine &&
                conditionSelect.value &&
                Array.isArray(
                    selectedMedicine.conditions
                ) &&
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
                    item =>
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
   GET MEDICINE NAME
========================================= */

function getMedicineName(
    medicine
) {

    if (!medicine) {

        return "Medicine";

    }


    return (
        medicine.genericName ||
        medicine.name ||
        "Medicine"
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


    if (medicineSearch) {

        medicineSearch.value =
            getMedicineName(
                medicine
            );

    }


    if (medicineSelect) {

        medicineSelect.value =
            String(
                medicine.id
            );

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

        medicineSelect.value =
            "";

    }


    if (medicineSearch) {

        medicineSearch.value =
            "";

    }


    if (clearMedicine) {

        clearMedicine.style.display =
            "none";

    }


    hideSearchResults();

    hideResult();

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


            /*
                Search the unified
                medicine database.
            */

            const filteredMedicines =
                typeof searchMedicines ===
                "function"

                    ? searchMedicines(
                        searchTerm
                    )

                    : medicines.filter(
                        medicine => {

                            const name =
                                getMedicineName(
                                    medicine
                                )
                                    .toLowerCase();


                            const brands =
                                medicine.brandNames ||
                                [];


                            return (
                                name.includes(
                                    searchTerm
                                ) ||
                                brands.some(
                                    brand =>
                                        String(
                                            brand
                                        )
                                            .toLowerCase()
                                            .includes(
                                                searchTerm
                                            )
                                )
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


    medicineResults.innerHTML =
        "";


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
        medicine => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "medicine-result-item";


            const medicineName =
                getMedicineName(
                    medicine
                );


            const drugClass =
                Array.isArray(
                    medicine.drugClass
                )

                    ? medicine.drugClass.join(
                        " · "
                    )

                    : (
                        medicine.drugClass ||
                        medicine.class ||
                        "Medicine"
                    );


            item.innerHTML = `
                <strong>
                    ${medicineName}
                </strong>

                <span>
                    ${drugClass}
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

        }
    );

}


/* =========================================
   CLOSE SEARCH
========================================= */

document.addEventListener(
    "click",
    event => {

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
   FORMAT NUMBER
========================================= */

function formatDoseNumber(
    value
) {

    const number =
        Number(value);


    if (!Number.isFinite(number)) {

        return "—";

    }


    /*
        Keep useful decimals
        without displaying
        unnecessary zeros.
    */

    return Number(
        number.toFixed(2)
    ).toString();

}


/* =========================================
   CALCULATE LIQUID VOLUME
========================================= */

/*
    Example:

    dose = 250 mg
    concentration = 125 mg / 5 mL

    volume =
        250 × 5 / 125

    = 10 mL
*/

function calculateLiquidVolume(
    doseMg,
    concentrationMg,
    concentrationMl
) {

    if (
        !Number.isFinite(doseMg) ||
        !Number.isFinite(concentrationMg) ||
        !Number.isFinite(concentrationMl) ||
        concentrationMg <= 0 ||
        concentrationMl <= 0
    ) {

        return NaN;

    }


    return (
        doseMg *
        concentrationMl
    ) / concentrationMg;

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

        const history =
            JSON.parse(saved);


        return Array.isArray(history)
            ? history
            : [];

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
   SAVE CALCULATION TO HISTORY
========================================= */

function saveCalculationToHistory(
    data
) {

    const history =
        getCalculationHistory();


    const now =
        new Date();


    const historyItem = {

        id:
            Date.now(),

        medicine:
            data.medicine,

        dose:
            data.dose,

        doseUnit:
            data.doseUnit,

        age:
            data.age,

        ageUnit:
            data.ageUnit,

        weight:
            data.weight,

        concentration:
            data.concentration,

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
            now.getTime()

    };


    /*
        Newest calculation
        appears first.
    */

    history.unshift(
        historyItem
    );


    /*
        Keep latest 50 records.
    */

    const limitedHistory =
        history.slice(
            0,
            50
        );


    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(
            limitedHistory
        )
    );


    console.log(
        "Calculation saved to history:",
        historyItem
    );

}


/* =========================================
   CREATE HISTORY RECORD
========================================= */

function createHistoryRecord(
    dose,
    unit,
    concentration
) {

    return {

        medicine:
            getMedicineName(
                selectedMedicine
            ),

        dose:
            dose,

        doseUnit:
            unit,

        age:
            ageInput
                ? ageInput.value
                : "",

        ageUnit:
            ageUnit
                ? ageUnit.value
                : "",

        weight:
            weightInput
                ? weightInput.value
                : "",

        concentration:
            concentration

    };

}


/* =========================================
   GET DOSING RULE
========================================= */

function getDosingRule() {

    if (
        !selectedMedicine ||
        !selectedMedicine.dosing
    ) {

        return null;

    }


    return selectedMedicine.dosing;

}


/* =========================================
   CALCULATE DOSE FROM DATABASE
========================================= */

/*
    This function reads the dosing rule
    from medicines.js.

    It does NOT invent a clinical dose.

    Supported structures will include:

    mgPerKgPerDose

    mgPerKgPerDay

    fixedDoseMg

    maxDoseMg

    maxDailyDoseMg

    frequency
*/

function calculateDoseFromRule(
    dosing,
    weight
) {

    if (!dosing) {

        return null;

    }


    let doseMg =
        NaN;


    /*
        MG / KG / DOSE
    */

    if (
        Number.isFinite(
            Number(
                dosing.mgPerKgPerDose
            )
        )
    ) {

        doseMg =
            Number(
                dosing.mgPerKgPerDose
            ) *
            weight;

    }


    /*
        MG / KG / DAY

        If the rule is expressed
        per day, divide by the
        number of doses per day.
    */

    else if (
        Number.isFinite(
            Number(
                dosing.mgPerKgPerDay
            )
        )
    ) {

        const dailyDose =
            Number(
                dosing.mgPerKgPerDay
            ) *
            weight;


        const dosesPerDay =
            Number(
                dosing.dosesPerDay
            );


        if (
            Number.isFinite(
                dosesPerDay
            ) &&
            dosesPerDay > 0
        ) {

            doseMg =
                dailyDose /
                dosesPerDay;

        }

        else {

            doseMg =
                dailyDose;

        }

    }


    /*
        FIXED DOSE
    */

    else if (
        Number.isFinite(
            Number(
                dosing.fixedDoseMg
            )
        )
    ) {

        doseMg =
            Number(
                dosing.fixedDoseMg
            );

    }


    if (
        !Number.isFinite(
            doseMg
        )
    ) {

        return null;

    }


    /*
        Maximum dose per dose
    */

    if (
        Number.isFinite(
            Number(
                dosing.maxDoseMg
            )
        )
    ) {

        doseMg =
            Math.min(
                doseMg,
                Number(
                    dosing.maxDoseMg
                )
            );

    }


    return {

        doseMg:
            doseMg,

        frequency:
            dosing.frequency ||
            "",

        route:
            dosing.route ||
            "",

        note:
            dosing.note ||
            ""

    };

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


    if (
        hasAge &&
        age < 0
    ) {

        showValidation(
            "Please enter a valid age."
        );

        return;

    }


    if (
        hasWeight &&
        weight <= 0
    ) {

        showValidation(
            "Please enter a valid weight."
        );

        return;

    }


    /*
        The current dosing engine
        requires weight for
        weight-based calculations.
    */

    if (!hasWeight) {

        showValidation(
            "Please enter the patient's weight to calculate the pediatric dose."
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
        getDosingRule();


    if (!dosing) {

        showValidation(
            "A verified pediatric dosing rule has not been configured for this medicine yet."
        );

        return;

    }


    /* -------------------------------------
       5. CALCULATE DOSE
    ------------------------------------- */

    const calculation =
        calculateDoseFromRule(
            dosing,
            weight
        );


    if (!calculation) {

        showValidation(
            "The dosing information for this medicine is incomplete."
        );

        return;

    }


    const doseMg =
        calculation.doseMg;


    /* -------------------------------------
       6. CALCULATE LIQUID VOLUME
    ------------------------------------- */

    const volumeMl =
        calculateLiquidVolume(
            doseMg,
            concentrationMg,
            concentrationMl
        );


    if (
        !Number.isFinite(
            volumeMl
        )
    ) {

        showValidation(
            "The medicine concentration could not be used to calculate the liquid volume."
        );

        return;

    }


    /* -------------------------------------
       7. DISPLAY RESULT
    ------------------------------------- */

    if (doseResult) {

        doseResult.textContent =
            formatDoseNumber(
                volumeMl
            );

    }


    if (doseUnit) {

        doseUnit.textContent =
            "mL";

    }


    if (resultDetails) {

        resultDetails.innerHTML = `

            <div>
                <span>
                    Dose
                </span>

                <strong>
                    ${formatDoseNumber(
                        doseMg
                    )} mg
                </strong>
            </div>


            <div>
                <span>
                    Concentration
                </span>

                <strong>
                    ${concentrationMg} mg /
                    ${concentrationMl} mL
                </strong>
            </div>


            <div>
                <span>
                    Frequency
                </span>

                <strong>
                    ${
                        calculation.frequency ||
                        "As configured"
                    }
                </strong>
            </div>

        `;

    }


    showResult();


    /* -------------------------------------
       8. SAVE SUCCESSFUL CALCULATION
          TO HISTORY
    ------------------------------------- */

    const historyData =
        createHistoryRecord(
            formatDoseNumber(
                volumeMl
            ),
            "mL",
            `${concentrationMg} mg / ${concentrationMl} mL`
        );


    saveCalculationToHistory(
        historyData
    );


    /*
        Optional note for the user.
    */

    console.log(
        "Dose calculation completed:",
        {
            medicine:
                getMedicineName(
                    selectedMedicine
                ),

            doseMg:
                doseMg,

            volumeMl:
                volumeMl
        }
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
