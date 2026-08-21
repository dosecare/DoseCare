/* =========================================
   DoseCare
   Pediatric Dose Calculator

   UPDATED VERSION
   - Syrups / Oral liquids only
   - No automatic clinical condition selection
   - User selects the dosing regimen
   - Supports multiple regimens per medicine
   - Calculates mg + mL + frequency
   - Supports mg/kg/dose
   - Supports mg/kg/day
   - Supports weight-based dosing
   - Supports condition-based databases WITHOUT
     requiring the user to select a condition
   - Shows minimum / maximum / daily limits
   - Saves calculation history
========================================= */


/* =========================================
   STORAGE
========================================= */

const HISTORY_STORAGE_KEY = "dosecareHistory";


/* =========================================
   DOM ELEMENTS
========================================= */

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

const concentrationSelect =
    document.getElementById("concentration-select");

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

const selectedMedicineInfo =
    document.getElementById("selected-medicine-info");

const selectedConcentration =
    document.getElementById("selected-concentration");

const minimumDose =
    document.getElementById("minimum-dose");

const maximumDose =
    document.getElementById("maximum-dose");

const doseFrequency =
    document.getElementById("dose-frequency");

const resultPerDose =
    document.getElementById("result-per-dose");

const resultImportant =
    document.getElementById("result-important");


/* =========================================
   CURRENT STATE
========================================= */

let selectedMedicine = null;

let selectedRegimen = null;


/* =========================================
   BASIC HELPERS
========================================= */

function getMedicineName(medicine) {

    if (!medicine) {
        return "Medicine";
    }

    return (
        medicine.genericName ||
        medicine.name ||
        "Medicine"
    );
}


function formatNumber(value, decimals = 2) {

    if (!Number.isFinite(Number(value))) {
        return "—";
    }

    const rounded =
        Number(
            Number(value).toFixed(decimals)
        );

    return rounded.toLocaleString("en-US");
}


function normalizeText(value) {

    return String(value || "")
        .trim()
        .toLowerCase();
}


/* =========================================
   MEDICINE FORM
========================================= */

function isLiquidMedicine(medicine) {

    if (!medicine) {
        return false;
    }

    const possibleForms = [
        medicine.dosageForm,
        medicine.dosage_form,
        medicine.form,
        medicine.routeForm,
        medicine.preparation,
        medicine.pharmaceuticalForm
    ];

    const forms =
        possibleForms
            .filter(Boolean)
            .map(normalizeText);

    const forbiddenForms = [
        "tablet",
        "tablets",
        "tab",
        "capsule",
        "capsules",
        "cap",
        "injection",
        "injectable",
        "cream",
        "ointment",
        "gel",
        "drops",
        "suppository"
    ];

    if (
        forms.some(
            form =>
                forbiddenForms.includes(form)
        )
    ) {
        return false;
    }

    if (
        forms.some(
            form =>
                form.includes("syrup") ||
                form.includes("suspension") ||
                form.includes("solution") ||
                form.includes("liquid") ||
                form.includes("oral")
        )
    ) {
        return true;
    }

    return (
        getAvailableConcentrations(medicine).length > 0
    );
}


/* =========================================
   CONCENTRATION PARSER
========================================= */

function parseConcentrationString(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return null;
    }

    const text =
        String(value)
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "");

    let match =
        text.match(
            /(\d+(?:\.\d+)?)mg\/(\d+(?:\.\d+)?)mgper(\d+(?:\.\d+)?)ml/
        );

    if (match) {

        const mg = Number(match[1]);
        const ml = Number(match[3]);

        if (
            Number.isFinite(mg) &&
            Number.isFinite(ml) &&
            mg > 0 &&
            ml > 0
        ) {
            return {
                mg,
                ml
            };
        }
    }

    match =
        text.match(
            /(\d+(?:\.\d+)?)mg\/(?:per)?(\d+(?:\.\d+)?)ml/
        );

    if (!match) {
        return null;
    }

    const mg = Number(match[1]);
    const ml = Number(match[2]);

    if (
        !Number.isFinite(mg) ||
        !Number.isFinite(ml) ||
        mg <= 0 ||
        ml <= 0
    ) {
        return null;
    }

    return {
        mg,
        ml
    };
}


/* =========================================
   GET CONCENTRATIONS
========================================= */

function getAvailableConcentrations(medicine) {

    if (!medicine) {
        return [];
    }

    let raw = [];

    if (
        Array.isArray(
            medicine.concentrations
        )
    ) {

        raw =
            medicine.concentrations;

    }
    else if (
        Array.isArray(
            medicine.availableConcentrations
        )
    ) {

        raw =
            medicine.availableConcentrations;

    }
    else if (
        Array.isArray(
            medicine.formulations
        )
    ) {

        raw =
            medicine.formulations
                .map(
                    item =>
                        item &&
                        (
                            item.concentration ||
                            item.strength
                        )
                )
                .filter(Boolean);

    }
    else if (
        medicine.concentration
    ) {

        raw = [
            medicine.concentration
        ];

    }
    else if (
        medicine.concentrationMg &&
        medicine.concentrationMl
    ) {

        raw = [
            {
                mg:
                    medicine.concentrationMg,

                ml:
                    medicine.concentrationMl
            }
        ];
    }

    const normalized = [];

    raw.forEach(item => {

        let result = null;

        if (
            typeof item === "string"
        ) {

            result =
                parseConcentrationString(
                    item
                );

        }
        else if (
            item &&
            typeof item === "object"
        ) {

            const mg =
                Number(
                    item.mg ??
                    item.mgPerVolume ??
                    item.concentrationMg
                );

            const ml =
                Number(
                    item.ml ??
                    item.volume ??
                    item.concentrationMl
                );

            if (
                Number.isFinite(mg) &&
                Number.isFinite(ml) &&
                mg > 0 &&
                ml > 0
            ) {

                result = {
                    mg,
                    ml
                };
            }

            if (
                !result &&
                item.concentration
            ) {

                result =
                    parseConcentrationString(
                        item.concentration
                    );
            }
        }

        if (!result) {
            return;
        }

        const duplicate =
            normalized.some(
                item =>
                    item.mg === result.mg &&
                    item.ml === result.ml
            );

        if (!duplicate) {
            normalized.push(result);
        }
    });

    return normalized;
}


function formatConcentration(concentration) {

    if (!concentration) {
        return "";
    }

    return (
        `${formatNumber(concentration.mg)} mg/${formatNumber(concentration.ml)} mL`
    );
}


/* =========================================
   CONCENTRATION UI
========================================= */

function populateConcentrations(medicine) {

    if (!concentrationSelect) {
        return;
    }

    concentrationSelect.innerHTML = "";

    const option =
        document.createElement("option");

    option.value = "";
    option.textContent =
        "Select a concentration";

    concentrationSelect.appendChild(option);

    const concentrations =
        getAvailableConcentrations(
            medicine
        );

    concentrations.forEach(
        concentration => {

            const item =
                document.createElement(
                    "option"
                );

            item.value =
                JSON.stringify(
                    concentration
                );

            item.textContent =
                formatConcentration(
                    concentration
                );

            concentrationSelect.appendChild(
                item
            );
        }
    );

    concentrationSelect.disabled =
        concentrations.length === 0;

    if (concentrationValue) {
        concentrationValue.value = "";
    }

    if (concentrationVolume) {
        concentrationVolume.value = "";
    }

    updateSelectedConcentration();
}


function updateSelectedConcentration() {

    if (!concentrationSelect) {
        return;
    }

    const value =
        concentrationSelect.value;

    if (!value) {

        if (selectedConcentration) {
            selectedConcentration.innerHTML = "";
        }

        return;
    }

    try {

        const concentration =
            JSON.parse(value);

        if (concentrationValue) {
            concentrationValue.value =
                concentration.mg;
        }

        if (concentrationVolume) {
            concentrationVolume.value =
                concentration.ml;
        }

        if (selectedConcentration) {

            selectedConcentration.innerHTML = `
                <strong>Selected concentration:</strong>
                ${formatConcentration(concentration)}
            `;
        }

    }
    catch (error) {

        console.error(
            "Concentration error:",
            error
        );
    }
}


if (concentrationSelect) {

    concentrationSelect.addEventListener(
        "change",
        updateSelectedConcentration
    );
}


/* =========================================
   MEDICINE LIST
========================================= */

function getAvailableMedicines() {

    if (
        !Array.isArray(
            medicines
        )
    ) {
        return [];
    }

    return medicines.filter(
        medicine =>
            isLiquidMedicine(
                medicine
            )
    );
}


function getMedicineByIdSafe(id) {

    if (
        typeof getMedicineById ===
        "function"
    ) {
        return getMedicineById(id);
    }

    return getAvailableMedicines()
        .find(
            medicine =>
                String(medicine.id) ===
                String(id)
        );
}


/* =========================================
   POPULATE MEDICINE SELECT
========================================= */

function populateMedicineSelect() {

    if (!medicineSelect) {
        return;
    }

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

    getAvailableMedicines()
        .forEach(
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
}


/* =========================================
   REGIMEN EXTRACTION
========================================= */

/*
    DoseCare now allows the user to select
    the regimen instead of selecting a
    clinical condition.

    This function supports several possible
    database structures.

    Examples:

    dosing.regimens = [
        {
            label: "Standard dose",
            type: "mg_per_kg_per_day",
            minDose: 8,
            maxDose: 8,
            frequency: 1
        }
    ]

    OR:

    dosing.options = [...]

    OR:

    dosing.conditionBased = [
        {
            condition: "Otitis media",
            dose: 40,
            frequency: 2
        }
    ]

    OR:

    dosing.conditions = {
        "Otitis media": {...},
        "Pneumonia": {...}
    }
*/


function cloneObject(object) {

    if (
        !object ||
        typeof object !== "object"
    ) {
        return object;
    }

    try {
        return JSON.parse(
            JSON.stringify(object)
        );
    }
    catch {
        return {
            ...object
        };
    }
}


function normalizeRegimen(
    regimen,
    fallbackLabel = "Recommended dose"
) {

    if (!regimen) {
        return null;
    }

    if (
        typeof regimen !== "object"
    ) {
        return null;
    }

    const result =
        cloneObject(regimen);

    result.label =
        result.label ||
        result.name ||
        result.title ||
        result.regimenName ||
        result.condition ||
        result.indication ||
        fallbackLabel;

    return result;
}


function getMedicineRegimens(medicine) {

    if (
        !medicine ||
        !medicine.dosing
    ) {
        return [];
    }

    const dosing =
        medicine.dosing;

    const regimens = [];


    /* -------------------------------------
       1. dosing.regimens
    ------------------------------------- */

    if (
        Array.isArray(
            dosing.regimens
        )
    ) {

        dosing.regimens.forEach(
            (item, index) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );

                if (regimen) {
                    regimens.push(regimen);
                }
            }
        );
    }


    /* -------------------------------------
       2. dosing.options
    ------------------------------------- */

    if (
        regimens.length === 0 &&
        Array.isArray(
            dosing.options
        )
    ) {

        dosing.options.forEach(
            (item, index) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );

                if (regimen) {
                    regimens.push(regimen);
                }
            }
        );
    }


    /* -------------------------------------
       3. dosing.conditionBased
    ------------------------------------- */

    if (
        regimens.length === 0 &&
        Array.isArray(
            dosing.conditionBased
        )
    ) {

        dosing.conditionBased.forEach(
            (item, index) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );

                if (regimen) {
                    regimens.push(regimen);
                }
            }
        );
    }


    /* -------------------------------------
       4. dosing.indications
    ------------------------------------- */

    if (
        regimens.length === 0 &&
        Array.isArray(
            dosing.indications
        )
    ) {

        dosing.indications.forEach(
            (item, index) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );

                if (regimen) {
                    regimens.push(regimen);
                }
            }
        );
    }


    /* -------------------------------------
       5. dosing.conditions object
    ------------------------------------- */

    if (
        regimens.length === 0 &&
        dosing.conditions &&
        typeof dosing.conditions ===
            "object" &&
        !Array.isArray(
            dosing.conditions
        )
    ) {

        Object.entries(
            dosing.conditions
        )
        .forEach(
            ([condition, regimen]) => {

                const normalized =
                    normalizeRegimen(
                        regimen,
                        condition
                    );

                if (normalized) {

                    if (
                        !normalized.condition
                    ) {
                        normalized.condition =
                            condition;
                    }

                    if (
                        !normalized.label
                    ) {
                        normalized.label =
                            condition;
                    }

                    regimens.push(
                        normalized
                    );
                }
            }
        );
    }


    /* -------------------------------------
       6. dosing.regimen
    ------------------------------------- */

    if (
        regimens.length === 0 &&
        dosing.regimen &&
        typeof dosing.regimen ===
            "object"
    ) {

        const regimen =
            normalizeRegimen(
                dosing.regimen
            );

        if (regimen) {
            regimens.push(regimen);
        }
    }


    /* -------------------------------------
       7. dosing.generalRegimen
    ------------------------------------- */

    if (
        regimens.length === 0 &&
        dosing.generalRegimen
    ) {

        const regimen =
            normalizeRegimen(
                dosing.generalRegimen,
                "General pediatric dose"
            );

        if (regimen) {
            regimens.push(regimen);
        }
    }


    /* -------------------------------------
       8. Single dosing rule
    ------------------------------------- */

    if (
        regimens.length === 0 &&
        (
            dosing.type ||
            dosing.minDose !== undefined ||
            dosing.maxDose !== undefined ||
            dosing.dose !== undefined
        )
    ) {

        const regimen =
            normalizeRegimen(
                dosing
            );

        if (regimen) {
            regimens.push(regimen);
        }
    }


    return regimens;
}


/* =========================================
   REGIMEN SELECT UI
========================================= */

function createRegimenSelector(
    medicine
) {

    if (!selectedMedicineInfo) {
        return;
    }

    selectedMedicineInfo.innerHTML = "";

    const regimens =
        getMedicineRegimens(
            medicine
        );

    /*
        No regimen configured.
    */

    if (!regimens.length) {

        selectedMedicineInfo.innerHTML = `
            <div class="medicine-info-warning">
                No pediatric dosing regimen has been
                configured for this medicine.
            </div>
        `;

        selectedRegimen = null;

        return;
    }


    /*
        One regimen only.

        No need to force the user to choose.
    */

    if (regimens.length === 1) {

        selectedRegimen =
            regimens[0];

        selectedMedicineInfo.innerHTML = `
            <div class="medicine-info-card">
                <strong>Available pediatric dose</strong>
                <span>${escapeHtml(
                    getRegimenLabel(
                        regimens[0]
                    )
                )}</span>
            </div>
        `;

        return;
    }


    /*
        Multiple regimens.

        User chooses the regimen.
    */

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "regimen-selector-wrapper";


    const label =
        document.createElement(
            "label"
        );

    label.textContent =
        "Select Dose / Regimen";


    const select =
        document.createElement(
            "select"
        );

    select.id =
        "regimen-select";

    select.className =
        "regimen-select";


    const defaultOption =
        document.createElement(
            "option"
        );

    defaultOption.value =
        "";

    defaultOption.textContent =
        "Select the dose you want";


    select.appendChild(
        defaultOption
    );


    regimens.forEach(
        (regimen, index) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                String(index);

            option.textContent =
                getRegimenLabel(
                    regimen
                );

            select.appendChild(
                option
            );
        }
    );


    select.addEventListener(
        "change",
        () => {

            const index =
                Number(
                    select.value
                );

            if (
                !Number.isInteger(index) ||
                !regimens[index]
            ) {

                selectedRegimen =
                    null;

                return;
            }

            selectedRegimen =
                regimens[index];

            hideValidation();
            hideResult();

        }
    );


    const hint =
        document.createElement(
            "p"
        );

    hint.className =
        "regimen-hint";

    hint.textContent =
        "Choose the pediatric dosing regimen you want to calculate.";


    wrapper.appendChild(label);
    wrapper.appendChild(select);
    wrapper.appendChild(hint);

    selectedMedicineInfo.appendChild(
        wrapper
    );
}


function getRegimenLabel(regimen) {

    if (!regimen) {
        return "Dose option";
    }

    if (regimen.label) {
        return String(
            regimen.label
        );
    }

    if (regimen.condition) {
        return String(
            regimen.condition
        );
    }

    if (regimen.indication) {
        return String(
            regimen.indication
        );
    }

    const type =
        normalizeText(
            regimen.type
        );

    const min =
        regimen.minDose ??
        regimen.dose;

    const max =
        regimen.maxDose ??
        regimen.dose;

    const doseText =
        min !== undefined
            ? (
                min === max
                    ? `${min}`
                    : `${min}–${max}`
            )
            : "";

    if (
        type ===
        "mg_per_kg_per_dose"
    ) {

        return `${doseText} mg/kg/dose`;

    }

    if (
        type ===
        "mg_per_kg_per_day"
    ) {

        return `${doseText} mg/kg/day`;

    }

    return (
        doseText
            ? `${doseText} mg/kg`
            : "Dose option"
    );
}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================
   SELECT MEDICINE
========================================= */

function selectMedicine(medicine) {

    if (!medicine) {
        return;
    }

    if (
        !isLiquidMedicine(
            medicine
        )
    ) {

        showValidation(
            "DoseCare currently supports syrups and oral liquid medicines only."
        );

        return;
    }

    selectedMedicine =
        medicine;

    selectedRegimen =
        null;

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

    populateConcentrations(
        medicine
    );

    createRegimenSelector(
        medicine
    );

    hideSearchResults();
    hideValidation();
    hideResult();
}


/* =========================================
   CLEAR MEDICINE
========================================= */

function clearSelectedMedicine() {

    selectedMedicine =
        null;

    selectedRegimen =
        null;

    if (medicineSelect) {
        medicineSelect.value = "";
    }

    if (medicineSearch) {
        medicineSearch.value = "";
    }

    if (concentrationSelect) {

        concentrationSelect.innerHTML = "";

        const option =
            document.createElement(
                "option"
            );

        option.value = "";
        option.textContent =
            "Select a concentration";

        concentrationSelect.appendChild(
            option
        );

        concentrationSelect.disabled =
            true;
    }

    if (concentrationValue) {
        concentrationValue.value = "";
    }

    if (concentrationVolume) {
        concentrationVolume.value = "";
    }

    if (selectedMedicineInfo) {
        selectedMedicineInfo.innerHTML = "";
    }

    if (selectedConcentration) {
        selectedConcentration.innerHTML = "";
    }

    if (clearMedicine) {
        clearMedicine.style.display =
            "none";
    }

    hideValidation();
    hideResult();
}


/* =========================================
   MEDICINE SELECT CHANGE
========================================= */

if (medicineSelect) {

    medicineSelect.addEventListener(
        "change",
        () => {

            const id =
                medicineSelect.value;

            if (!id) {

                clearSelectedMedicine();

                return;
            }

            const medicine =
                getMedicineByIdSafe(id);

            selectMedicine(
                medicine
            );
        }
    );
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

            const results =
                getAvailableMedicines()
                    .filter(
                        medicine => {

                            const name =
                                getMedicineName(
                                    medicine
                                )
                                .toLowerCase();

                            const brands =
                                Array.isArray(
                                    medicine.brandNames
                                )
                                    ? medicine.brandNames
                                    : [];

                            const brandMatch =
                                brands.some(
                                    brand =>
                                        String(
                                            brand
                                        )
                                        .toLowerCase()
                                        .includes(
                                            searchTerm
                                        )
                                );

                            const drugClass =
                                Array.isArray(
                                    medicine.drugClass
                                )
                                    ? medicine.drugClass
                                        .join(" ")
                                        .toLowerCase()
                                    : String(
                                        medicine.drugClass ||
                                        medicine.class ||
                                        ""
                                    )
                                    .toLowerCase();

                            return (
                                name.includes(
                                    searchTerm
                                ) ||
                                brandMatch ||
                                drugClass.includes(
                                    searchTerm
                                )
                            );
                        }
                    );

            showSearchResults(
                results
            );
        }
    );
}


/* =========================================
   SHOW SEARCH RESULTS
========================================= */

function showSearchResults(results) {

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

        empty.innerHTML =
            "<span>No liquid medicine found</span>";

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

            const name =
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
                    ${escapeHtml(name)}
                </strong>
                <span>
                    ${escapeHtml(drugClass)}
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


function hideSearchResults() {

    if (medicineResults) {
        medicineResults.style.display =
            "none";
    }
}


if (clearMedicine) {

    clearMedicine.addEventListener(
        "click",
        () => {

            clearSelectedMedicine();

            hideSearchResults();
        }
    );
}


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

function showValidation(message) {

    if (!validationMessage) {
        return;
    }

    const paragraph =
        validationMessage.querySelector(
            "p"
        );

    if (paragraph) {
        paragraph.textContent =
            message;
    }

    validationMessage.style.display =
        "flex";
}


function hideValidation() {

    if (validationMessage) {
        validationMessage.style.display =
            "none";
    }
}


/* =========================================
   RESULT
========================================= */

function hideResult() {

    if (resultCard) {
        resultCard.style.display =
            "none";
    }
}


function showResult() {

    if (resultCard) {
        resultCard.style.display =
            "block";
    }
}


/* =========================================
   AGE
========================================= */

function getAgeInMonths() {

    const age =
        ageInput
            ? parseFloat(
                ageInput.value
            )
            : NaN;

    if (!Number.isFinite(age)) {
        return null;
    }

    const unit =
        ageUnit
            ? normalizeText(
                ageUnit.value
            )
            : "years";

    if (
        unit === "month" ||
        unit === "months" ||
        unit === "mo"
    ) {
        return age;
    }

    return age * 12;
}


function formatAgeFromMonths(months) {

    if (months < 12) {

        return (
            `${formatNumber(months, 0)} month(s)`
        );
    }

    const years =
        months / 12;

    if (
        Number.isInteger(
            years
        )
    ) {

        return (
            `${years} year(s)`
        );
    }

    return (
        `${formatNumber(years, 1)} year(s)`
    );
}


/* =========================================
   AGE VALIDATION
========================================= */

function validateMedicineAge(medicine) {

    const ageMonths =
        getAgeInMonths();

    if (!Number.isFinite(ageMonths)) {

        return {
            valid: true
        };
    }

    const dosing =
        medicine &&
        medicine.dosing;

    if (!dosing) {

        return {
            valid: true
        };
    }

    const minimumMonths =
        Number(
            dosing.minimumAgeMonths
        );

    const minimumYears =
        Number(
            dosing.minimumAgeYears
        );

    const maximumYears =
        Number(
            dosing.maximumAgeYears
        );

    if (
        Number.isFinite(
            minimumMonths
        ) &&
        ageMonths <
            minimumMonths
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for use below ${formatAgeFromMonths(minimumMonths)}.`

        };
    }

    if (
        Number.isFinite(
            minimumYears
        ) &&
        ageMonths <
            minimumYears * 12
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for use below ${minimumYears} year(s).`

        };
    }

    if (
        Number.isFinite(
            maximumYears
        ) &&
        ageMonths >
            maximumYears * 12
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for pediatric dosing above ${maximumYears} years.`

        };
    }

    return {
        valid: true
    };
}


/* =========================================
   CALCULATE REGIMEN
========================================= */

function calculateDosingRule(
    medicine,
    weight,
    regimen
) {

    if (!medicine) {

        return {

            success: false,

            message:
                "Please select a medicine."
        };
    }

    const dosing =
        regimen ||
        medicine.dosing;

    if (!dosing) {

        return {

            success: false,

            message:
                "A pediatric dosing regimen has not been configured for this medicine."
        };
    }

    const type =
        normalizeText(
            dosing.type
        );


    /* =====================================
       MG / KG / DOSE
    ===================================== */

    if (
        type ===
        "mg_per_kg_per_dose"
    ) {

        const minDose =
            Number(
                dosing.minDose ??
                dosing.dose
            );

        const maxDose =
            Number(
                dosing.maxDose ??
                dosing.dose
            );

        if (
            !Number.isFinite(
                minDose
            ) ||
            !Number.isFinite(
                maxDose
            )
        ) {

            return {

                success: false,

                message:
                    "The selected dosing regimen is incomplete."
            };
        }

        let minMg =
            weight *
            minDose;

        let maxMg =
            weight *
            maxDose;

        const frequency =
            Number(
                dosing.frequency
            ) || 1;


        if (
            Number.isFinite(
                Number(
                    dosing.maxPerDose
                )
            )
        ) {

            maxMg =
                Math.min(
                    maxMg,
                    Number(
                        dosing.maxPerDose
                    )
                );
        }


        let dailyMinMg =
            minMg *
            frequency;

        let dailyMaxMg =
            maxMg *
            frequency;


        if (
            Number.isFinite(
                Number(
                    dosing.maxDailyDose
                )
            )
        ) {

            dailyMaxMg =
                Math.min(
                    dailyMaxMg,
                    Number(
                        dosing.maxDailyDose
                    )
                );

            maxMg =
                Math.min(
                    maxMg,
                    Number(
                        dosing.maxDailyDose
                    ) /
                    frequency
                );
        }


        return {

            success: true,

            minMg,

            maxMg,

            dailyMinMg,

            dailyMaxMg,

            frequency:
                getFrequencyText(
                    dosing,
                    frequency
                ),

            dosesPerDay:
                frequency,

            unit:
                "mg/kg/dose",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                Number(
                    dosing.maxPerDose
                ),

            maxDailyDose:
                Number(
                    dosing.maxDailyDose
                )
        };
    }


    /* =====================================
       MG / KG / DAY
    ===================================== */

    if (
        type ===
        "mg_per_kg_per_day" ||
        type ===
        "weight_based"
    ) {

        const minDailyDose =
            Number(
                dosing.minDose ??
                dosing.dose
            );

        const maxDailyDose =
            Number(
                dosing.maxDose ??
                dosing.dose
            );

        if (
            !Number.isFinite(
                minDailyDose
            ) ||
            !Number.isFinite(
                maxDailyDose
            )
        ) {

            return {

                success: false,

                message:
                    "The selected dosing regimen is incomplete."
            };
        }

        let dailyMinMg =
            weight *
            minDailyDose;

        let dailyMaxMg =
            weight *
            maxDailyDose;


        if (
            Number.isFinite(
                Number(
                    dosing.maxDailyDose
                )
            )
        ) {

            dailyMaxMg =
                Math.min(
                    dailyMaxMg,
                    Number(
                        dosing.maxDailyDose
                    )
                );
        }


        const frequency =
            Number(
                dosing.frequency
            ) || 1;


        let minMg =
            dailyMinMg /
            frequency;

        let maxMg =
            dailyMaxMg /
            frequency;


        if (
            Number.isFinite(
                Number(
                    dosing.maxPerDose
                )
            )
        ) {

            maxMg =
                Math.min(
                    maxMg,
                    Number(
                        dosing.maxPerDose
                    )
                );
        }


        return {

            success: true,

            minMg,

            maxMg,

            dailyMinMg,

            dailyMaxMg,

            frequency:
                getFrequencyText(
                    dosing,
                    frequency
                ),

            dosesPerDay:
                frequency,

            unit:
                "mg/kg/day",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                Number(
                    dosing.maxPerDose
                ),

            maxDailyDose:
                Number(
                    dosing.maxDailyDose
                )
        };
    }


    /* =====================================
       CONDITION BASED
       
       IMPORTANT:
       The user already selected the
       regimen from the UI.

       Therefore conditionBased is NOT
       automatically guessed.
    ===================================== */

    if (
        type ===
        "condition_based"
    ) {

        /*
            If this object is itself a complete
            regimen, calculate it.

            This allows a selected condition /
            indication object to work without
            making the calculator choose one.
        */

        const minDose =
            Number(
                dosing.minDose ??
                dosing.dose
            );

        const maxDose =
            Number(
                dosing.maxDose ??
                dosing.dose
            );

        const frequency =
            Number(
                dosing.frequency
            ) || 1;


        if (
            Number.isFinite(
                minDose
            ) &&
            Number.isFinite(
                maxDose
            )
        ) {

            const dailyMinMg =
                weight *
                minDose;

            let dailyMaxMg =
                weight *
                maxDose;


            if (
                Number.isFinite(
                    Number(
                        dosing.maxDailyDose
                    )
                )
            ) {

                dailyMaxMg =
                    Math.min(
                        dailyMaxMg,
                        Number(
                            dosing.maxDailyDose
                        )
                    );
            }


            let minMg =
                dailyMinMg /
                frequency;

            let maxMg =
                dailyMaxMg /
                frequency;


            if (
                Number.isFinite(
                    Number(
                        dosing.maxPerDose
                    )
                )
            ) {

                maxMg =
                    Math.min(
                        maxMg,
                        Number(
                            dosing.maxPerDose
                        )
                    );
            }


            return {

                success: true,

                minMg,

                maxMg,

                dailyMinMg,

                dailyMaxMg,

                frequency:
                    getFrequencyText(
                        dosing,
                        frequency
                    ),

                dosesPerDay:
                    frequency,

                unit:
                    "mg/kg/day",

                duration:
                    dosing.duration ||
                    "",

                maxPerDose:
                    Number(
                        dosing.maxPerDose
                    ),

                maxDailyDose:
                    Number(
                        dosing.maxDailyDose
                    )
            };
        }


        return {

            success: false,

            message:
                "The selected dosing regimen is incomplete."
        };
    }


    /* =====================================
       SEVERITY BASED
    ===================================== */

    if (
        type ===
        "severity_based"
    ) {

        const minDailyDose =
            Number(
                dosing.minDose
            );

        const maxDailyDose =
            Number(
                dosing.maxDose
            );

        if (
            !Number.isFinite(
                minDailyDose
            ) ||
            !Number.isFinite(
                maxDailyDose
            )
        ) {

            return {

                success: false,

                message:
                    "The selected dosing regimen is incomplete."
            };
        }


        const frequencies =
            Array.isArray(
                dosing.frequencyOptions
            )
                ? dosing.frequencyOptions
                    .map(Number)
                    .filter(
                        Number.isFinite
                    )
                : [];


        const frequency =
            Number(
                dosing.frequency
            ) ||
            frequencies[0] ||
            1;


        const dailyMinMg =
            weight *
            minDailyDose;

        const dailyMaxMg =
            weight *
            maxDailyDose;


        const minMg =
            dailyMinMg /
            frequency;

        const maxMg =
            dailyMaxMg /
            frequency;


        return {

            success: true,

            minMg,

            maxMg,

            dailyMinMg,

            dailyMaxMg,

            frequency:
                getFrequencyText(
                    dosing,
                    frequency
                ),

            dosesPerDay:
                frequency,

            unit:
                "mg/kg/day",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                Number(
                    dosing.maxPerDose
                ),

            maxDailyDose:
                Number(
                    dosing.maxDailyDose
                )
        };
    }


    /* =====================================
       UNKNOWN TYPE
    ===================================== */

    return {

        success: false,

        message:
            "The selected dosing regimen has an unsupported dosing type."
    };
}


/* =========================================
   FREQUENCY TEXT
========================================= */

function getFrequencyText(
    dosing,
    frequency
) {

    if (
        dosing.interval
    ) {
        return String(
            dosing.interval
        );
    }

    if (
        dosing.frequencyText
    ) {
        return String(
            dosing.frequencyText
        );
    }

    if (
        frequency === 1
    ) {
        return "Once daily";
    }

    if (
        frequency === 2
    ) {
        return "Twice daily";
    }

    if (
        frequency === 3
    ) {
        return "Three times daily";
    }

    if (
        frequency === 4
    ) {
        return "Four times daily";
    }

    return (
        `${frequency} times daily`
    );
}


/* =========================================
   MG → ML
========================================= */

function calculateVolume(
    doseMg,
    concentrationMg,
    concentrationMl
) {

    if (
        !Number.isFinite(
            doseMg
        ) ||
        !Number.isFinite(
            concentrationMg
        ) ||
        !Number.isFinite(
            concentrationMl
        ) ||
        concentrationMg <= 0 ||
        concentrationMl <= 0
    ) {
        return NaN;
    }

    return (
        doseMg *
        concentrationMl
    ) /
    concentrationMg;
}


/* =========================================
   DISPLAY RESULT
========================================= */

function displayDoseResult(
    result,
    concentrationMg,
    concentrationMl
) {

    const minMg =
        result.minMg;

    const maxMg =
        result.maxMg;


    const minMl =
        calculateVolume(
            minMg,
            concentrationMg,
            concentrationMl
        );

    const maxMl =
        calculateVolume(
            maxMg,
            concentrationMg,
            concentrationMl
        );


    /* =====================================
       MAIN RESULT
    ===================================== */

    if (doseResult) {

        if (
            Math.abs(
                maxMg -
                minMg
            ) < 0.001
        ) {

            doseResult.textContent =
                `${formatNumber(minMg)} mg`;

        }
        else {

            doseResult.textContent =
                `${formatNumber(minMg)}–${formatNumber(maxMg)} mg`;
        }
    }


    if (doseUnit) {

        doseUnit.textContent =
            "per dose";
    }


    if (resultPerDose) {

        resultPerDose.textContent =
            "Per dose";
    }


    /* =====================================
       SUMMARY
    ===================================== */

    if (minimumDose) {

        minimumDose.textContent =
            `${formatNumber(minMl)} mL`;
    }


    if (maximumDose) {

        maximumDose.textContent =
            `${formatNumber(maxMl)} mL`;
    }


    if (doseFrequency) {

        doseFrequency.textContent =
            result.frequency ||
            "—";
    }


    /* =====================================
       DETAILS
    ===================================== */

    if (resultDetails) {

        const details = [];


        if (
            Number.isFinite(
                minMl
            ) &&
            Number.isFinite(
                maxMl
            )
        ) {

            const volumeText =
                Math.abs(
                    maxMl -
                    minMl
                ) < 0.01
                    ? `${formatNumber(minMl)} mL`
                    : `${formatNumber(minMl)}–${formatNumber(maxMl)} mL`;

            details.push(
                `<strong>Give:</strong> ${volumeText} per dose`
            );
        }


        details.push(
            `<strong>Concentration:</strong> ${formatNumber(concentrationMg)} mg/${formatNumber(concentrationMl)} mL`
        );


        if (
            result.frequency
        ) {

            details.push(
                `<strong>Frequency:</strong> ${escapeHtml(result.frequency)}`
            );
        }


        if (
            Number.isFinite(
                result.dailyMinMg
            ) &&
            Number.isFinite(
                result.dailyMaxMg
            )
        ) {

            const dailyText =
                Math.abs(
                    result.dailyMaxMg -
                    result.dailyMinMg
                ) < 0.001
                    ? `${formatNumber(result.dailyMinMg)} mg/day`
                    : `${formatNumber(result.dailyMinMg)}–${formatNumber(result.dailyMaxMg)} mg/day`;

            details.push(
                `<strong>Total daily dose:</strong> ${dailyText}`
            );
        }


        if (
            Number.isFinite(
                result.maxPerDose
            )
        ) {

            const maxPerDoseMl =
                calculateVolume(
                    result.maxPerDose,
                    concentrationMg,
                    concentrationMl
                );

            let text =
                `${formatNumber(result.maxPerDose)} mg`;

            if (
                Number.isFinite(
                    maxPerDoseMl
                )
            ) {

                text +=
                    ` (${formatNumber(maxPerDoseMl)} mL)`;
            }

            details.push(
                `<strong>Maximum per dose:</strong> ${text}`
            );
        }


        if (
            Number.isFinite(
                result.maxDailyDose
            )
        ) {

            const maxDailyMl =
                calculateVolume(
                    result.maxDailyDose,
                    concentrationMg,
                    concentrationMl
                );

            let text =
                `${formatNumber(result.maxDailyDose)} mg/day`;

            if (
                Number.isFinite(
                    maxDailyMl
                )
            ) {

                text +=
                    ` (${formatNumber(maxDailyMl)} mL/day)`;
            }

            details.push(
                `<strong>Maximum daily dose:</strong> ${text}`
            );
        }


        if (
            result.duration
        ) {

            details.push(
                `<strong>Duration:</strong> ${escapeHtml(result.duration)}`
            );
        }


        const ageMonths =
            getAgeInMonths();

        if (
            Number.isFinite(
                ageMonths
            )
        ) {

            details.push(
                `<strong>Patient age:</strong> ${formatAgeFromMonths(ageMonths)}`
            );
        }


        if (
            weightInput &&
            Number.isFinite(
                parseFloat(
                    weightInput.value
                )
            )
        ) {

            details.push(
                `<strong>Weight:</strong> ${formatNumber(
                    parseFloat(
                        weightInput.value
                    )
                )} kg`
            );
        }


        if (
            selectedRegimen
        ) {

            details.push(
                `<strong>Selected regimen:</strong> ${escapeHtml(
                    getRegimenLabel(
                        selectedRegimen
                    )
                )}`
            );
        }


        resultDetails.innerHTML =
            details.join("<br>");
    }


    /* =====================================
       IMPORTANT INFORMATION
    ===================================== */

    if (resultImportant) {

        resultImportant.innerHTML = "";

        if (
            selectedMedicine &&
            selectedMedicine.notes
        ) {

            resultImportant.innerHTML += `
                <p>
                    <strong>Important note:</strong>
                    ${escapeHtml(
                        selectedMedicine.notes
                    )}
                </p>
            `;
        }

        if (
            selectedMedicine &&
            selectedMedicine.warnings
        ) {

            resultImportant.innerHTML += `
                <p>
                    <strong>Warning:</strong>
                    ${escapeHtml(
                        selectedMedicine.warnings
                    )}
                </p>
            `;
        }
    }


    showResult();
}


/* =========================================
   HISTORY
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
            JSON.parse(
                saved
            );

        return Array.isArray(
            history
        )
            ? history
            : [];

    }
    catch {

        return [];
    }
}


function saveCalculationToHistory(data) {

    let history =
        getCalculationHistory();

    const now =
        new Date();

    const item = {

        id:
            Date.now(),

        medicine:
            data.medicine,

        regimen:
            data.regimen,

        dose:
            data.dose,

        doseUnit:
            data.doseUnit,

        volume:
            data.volume,

        age:
            data.age,

        ageUnit:
            data.ageUnit,

        weight:
            data.weight,

        concentration:
            data.concentration,

        frequency:
            data.frequency,

        duration:
            data.duration,

        date:
            now.toLocaleDateString(
                "en-GB"
            ),

        time:
            now.toLocaleTimeString(
                "en-US",
                {
                    hour:
                        "2-digit",

                    minute:
                        "2-digit"
                }
            ),

        timestamp:
            now.getTime()
    };

    history.unshift(
        item
    );

    history =
        history.slice(
            0,
            50
        );

    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(
            history
        )
    );
}


/* =========================================
   GET SELECTED CONCENTRATION
========================================= */

function getSelectedConcentration() {

    let mg = NaN;
    let ml = NaN;


    if (
        concentrationSelect &&
        concentrationSelect.value
    ) {

        try {

            const value =
                JSON.parse(
                    concentrationSelect.value
                );

            mg =
                Number(
                    value.mg
                );

            ml =
                Number(
                    value.ml
                );

        }
        catch {

            mg = NaN;
            ml = NaN;
        }
    }


    if (
        !Number.isFinite(mg) ||
        !Number.isFinite(ml)
    ) {

        mg =
            concentrationValue
                ? parseFloat(
                    concentrationValue.value
                )
                : NaN;

        ml =
            concentrationVolume
                ? parseFloat(
                    concentrationVolume.value
                )
                : NaN;
    }


    return {
        mg,
        ml
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


    /* =====================================
       1. MEDICINE
    ===================================== */

    if (!selectedMedicine) {

        showValidation(
            "Please select a medicine before calculating the dose."
        );

        return;
    }


    /* =====================================
       2. REGIMEN
    ===================================== */

    const regimens =
        getMedicineRegimens(
            selectedMedicine
        );


    /*
        If there is more than one regimen,
        the user MUST choose one.
    */

    if (
        regimens.length > 1 &&
        !selectedRegimen
    ) {

        showValidation(
            "Please select the dose / regimen you want to calculate."
        );

        return;
    }


    /*
        If only one regimen exists,
        use it automatically.
    */

    if (
        regimens.length === 1 &&
        !selectedRegimen
    ) {

        selectedRegimen =
            regimens[0];
    }


    if (!selectedRegimen) {

        showValidation(
            "A pediatric dosing regimen has not been configured for this medicine."
        );

        return;
    }


    /* =====================================
       3. AGE
    ===================================== */

    const age =
        ageInput
            ? parseFloat(
                ageInput.value
            )
            : NaN;

    if (
        !Number.isFinite(age) ||
        age < 0
    ) {

        showValidation(
            "Please enter the patient's age."
        );

        return;
    }


    /* =====================================
       4. WEIGHT
    ===================================== */

    const weight =
        weightInput
            ? parseFloat(
                weightInput.value
            )
            : NaN;

    if (
        !Number.isFinite(weight) ||
        weight <= 0
    ) {

        showValidation(
            "Please enter the patient's weight."
        );

        return;
    }


    /* =====================================
       5. AGE VALIDATION
    ===================================== */

    const ageValidation =
        validateMedicineAge(
            selectedMedicine
        );

    if (
        !ageValidation.valid
    ) {

        showValidation(
            ageValidation.message
        );

        return;
    }


    /* =====================================
       6. CONCENTRATION
    ===================================== */

    const concentration =
        getSelectedConcentration();

    const concentrationMg =
        concentration.mg;

    const concentrationMl =
        concentration.ml;


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
            "Please select the available medicine concentration."
        );

        return;
    }


    /* =====================================
       7. CALCULATE
    ===================================== */

    const result =
        calculateDosingRule(
            selectedMedicine,
            weight,
            selectedRegimen
        );


    if (
        !result.success
    ) {

        showValidation(
            result.message ||
            "Unable to calculate the pediatric dose."
        );

        return;
    }


    /* =====================================
       8. DISPLAY
    ===================================== */

    displayDoseResult(
        result,
        concentrationMg,
        concentrationMl
    );


    /* =====================================
       9. HISTORY
    ===================================== */

    const minMl =
        calculateVolume(
            result.minMg,
            concentrationMg,
            concentrationMl
        );

    const maxMl =
        calculateVolume(
            result.maxMg,
            concentrationMg,
            concentrationMl
        );


    const doseText =
        Math.abs(
            result.maxMg -
            result.minMg
        ) < 0.001

            ? `${formatNumber(result.minMg)} mg`

            : `${formatNumber(result.minMg)}–${formatNumber(result.maxMg)} mg`;


    const volumeText =
        Math.abs(
            maxMl -
            minMl
        ) < 0.01

            ? `${formatNumber(minMl)} mL`

            : `${formatNumber(minMl)}–${formatNumber(maxMl)} mL`;


    saveCalculationToHistory({

        medicine:
            getMedicineName(
                selectedMedicine
            ),

        regimen:
            getRegimenLabel(
                selectedRegimen
            ),

        dose:
            doseText,

        doseUnit:
            "per dose",

        volume:
            volumeText,

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
            `${concentrationMg} mg/${concentrationMl} mL`,

        frequency:
            result.frequency ||
            "",

        duration:
            result.duration ||
            ""
    });
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

function initializeCalculator() {

    populateMedicineSelect();


    if (concentrationSelect) {

        concentrationSelect.innerHTML =
            "";

        const option =
            document.createElement(
                "option"
            );

        option.value = "";

        option.textContent =
            "Select a concentration";

        concentrationSelect.appendChild(
            option
        );

        concentrationSelect.disabled =
            true;
    }


    if (selectedMedicine) {

        populateConcentrations(
            selectedMedicine
        );

        createRegimenSelector(
            selectedMedicine
        );
    }


    hideValidation();
    hideResult();
}


/* =========================================
   START
========================================= */

initializeCalculator();
