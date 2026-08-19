/* =========================================
   DoseCare
   Pediatric Dose Calculator
   Calculator Logic
   Connected to Unified Medicine Database
========================================= */


/* =========================================
   STORAGE
========================================= */

const HISTORY_STORAGE_KEY = "dosecareHistory";


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
   CONDITION HELPERS
========================================= */

/*
    Normalize condition text.

    Example:
    "acute otitis media"
    →
    "acute_otitis_media"

    This allows the calculator to work with
    regimen keys written with spaces OR underscores.
*/

function normalizeConditionKey(condition) {

    if (!condition) {
        return "";
    }

    return String(condition)
        .trim()
        .toLowerCase()
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .replace(/\s/g, "_");

}


/*
    Convert any condition into a readable name.
*/

function formatConditionName(condition) {

    if (!condition) {
        return "";
    }

    return String(condition)
        .replace(/[_-]+/g, " ")
        .split(" ")
        .filter(Boolean)
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

}


/* =========================================
   GET ALL CONDITIONS
========================================= */

function getAllConditions() {

    const conditionSet = new Set();

    if (!Array.isArray(medicines)) {
        return [];
    }

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

                    if (condition) {
                        conditionSet.add(
                            condition
                        );
                    }

                }
            );

        }
    );

    return Array.from(
        conditionSet
    ).sort(
        (a, b) =>
            String(a).localeCompare(
                String(b)
            )
    );

}


/* =========================================
   INITIALIZE CONDITIONS
========================================= */

function initializeConditions() {

    if (!conditionSelect) {
        return;
    }

    /*
        Keep the original HTML option if it exists.
        Remove only dynamically generated options.
    */

    const existingValue =
        conditionSelect.value;

    const originalOptions =
        Array.from(
            conditionSelect.options
        );

    const hasDefaultOption =
        originalOptions.some(
            option =>
                option.value === ""
        );

    conditionSelect.innerHTML = "";

    /*
        Default option
    */

    const defaultOption =
        document.createElement(
            "option"
        );

    defaultOption.value = "";

    defaultOption.textContent =
        "Select a condition";

    conditionSelect.appendChild(
        defaultOption
    );


    /*
        Add all database conditions
    */

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


    /*
        Restore previous value
        if it still exists.
    */

    if (
        existingValue &&
        Array.from(
            conditionSelect.options
        ).some(
            option =>
                option.value ===
                existingValue
        )
    ) {

        conditionSelect.value =
            existingValue;

    }

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
        medicine => {

            if (
                !Array.isArray(
                    medicine.conditions
                )
            ) {
                return false;
            }

            return medicine.conditions.some(
                condition =>
                    normalizeConditionKey(
                        condition
                    ) ===
                    normalizeConditionKey(
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
        medicine => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                String(medicine.id);

            option.textContent =
                medicine.genericName ||
                medicine.name ||
                "Medicine";

            medicineSelect.appendChild(
                option
            );

        }
    );


    medicineSelect.disabled = false;


    /*
        If selected medicine is still
        valid for this condition,
        keep it selected.
    */

    if (
        selectedMedicine &&
        availableMedicines.some(
            medicine =>
                String(medicine.id) ===
                String(
                    selectedMedicine.id
                )
        )
    ) {

        medicineSelect.value =
            String(
                selectedMedicine.id
            );

    }

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
                If selected medicine does not
                belong to the selected condition,
                clear it.
            */

            if (
                selectedMedicine &&
                conditionSelect.value &&
                (
                    !Array.isArray(
                        selectedMedicine.conditions
                    ) ||
                    !selectedMedicine.conditions.some(
                        condition =>
                            normalizeConditionKey(
                                condition
                            ) ===
                            normalizeConditionKey(
                                conditionSelect.value
                            )
                    )
                )
            ) {

                clearSelectedMedicine();

            }


            hideValidation();
            hideResult();

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
                getMedicineById(
                    medicineId
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
        medicineSelect.value = "";
    }


    if (medicineSearch) {
        medicineSearch.value = "";
    }


    if (clearMedicine) {

        clearMedicine.style.display =
            "none";

    }


    hideValidation();
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


            const filteredMedicines =
                medicines.filter(
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


                        const className =
                            String(
                                medicine.class ||
                                ""
                            )
                            .toLowerCase();


                        const condition =
                            String(
                                medicine.condition ||
                                ""
                            )
                            .toLowerCase();


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


                        return (
                            name.includes(
                                searchTerm
                            ) ||
                            brandMatch ||
                            className.includes(
                                searchTerm
                            ) ||
                            condition.includes(
                                searchTerm
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

            hideSearchResults();

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
   VALIDATION UI
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
   RESULT UI
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
   NUMBER FORMATTER
========================================= */

function formatNumber(
    value,
    decimals = 2
) {

    if (!Number.isFinite(value)) {
        return "—";
    }


    const rounded =
        Number(
            value.toFixed(
                decimals
            )
        );


    return rounded.toLocaleString(
        "en-US"
    );

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
            ? String(
                ageUnit.value
            ).toLowerCase()
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


/* =========================================
   AGE VALIDATION
========================================= */

function validateMedicineAge(
    medicine
) {

    if (!medicine) {
        return {
            valid: true
        };
    }


    const ageMonths =
        getAgeInMonths();


    if (!Number.isFinite(ageMonths)) {

        return {
            valid: true
        };

    }


    const dosing =
        medicine.dosing;


    if (!dosing) {

        return {
            valid: true
        };

    }


    /*
        Minimum age in months
    */

    if (
        Number.isFinite(
            dosing.minimumAgeMonths
        ) &&
        ageMonths <
            dosing.minimumAgeMonths
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for automatic dosing below ${formatAgeFromMonths(dosing.minimumAgeMonths)}.`

        };

    }


    /*
        Minimum age in years
    */

    if (
        Number.isFinite(
            dosing.minimumAgeYears
        ) &&
        ageMonths <
            dosing.minimumAgeYears * 12
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for automatic dosing below ${dosing.minimumAgeYears} year(s).`

        };

    }


    /*
        Maximum age in years
    */

    if (
        Number.isFinite(
            dosing.maximumAgeYears
        ) &&
        ageMonths >
            dosing.maximumAgeYears * 12
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for automatic pediatric dosing above ${dosing.maximumAgeYears} years.`

        };

    }


    return {
        valid: true
    };

}


/* =========================================
   FORMAT AGE
========================================= */

function formatAgeFromMonths(
    months
) {

    if (months < 12) {

        return `${months} month(s)`;

    }


    const years =
        months / 12;


    if (
        Number.isInteger(
            years
        )
    ) {

        return `${years} year(s)`;

    }


    return `${formatNumber(years, 1)} year(s)`;

}


/* =========================================
   FIND CONDITION REGIMEN
========================================= */

function getConditionRegimen(
    medicine,
    condition
) {

    if (
        !medicine ||
        !medicine.dosing ||
        !medicine.dosing.regimens
    ) {

        return null;

    }


    const regimens =
        medicine.dosing.regimens;


    const requestedKey =
        normalizeConditionKey(
            condition
        );


    /*
        Exact normalized match
    */

    for (
        const key of Object.keys(regimens)
    ) {

        if (
            normalizeConditionKey(
                key
            ) === requestedKey
        ) {

            return {
                key: key,
                regimen: regimens[key]
            };

        }

    }


    /*
        Try matching medicine conditions
        against regimen names.
    */

    if (
        Array.isArray(
            medicine.conditions
        )
    ) {

        for (
            const medicineCondition
            of medicine.conditions
        ) {

            if (
                normalizeConditionKey(
                    medicineCondition
                ) !== requestedKey
            ) {
                continue;
            }


            for (
                const key of Object.keys(
                    regimens
                )
            ) {

                const normalizedKey =
                    normalizeConditionKey(
                        key
                    );


                if (
                    normalizedKey ===
                    normalizeConditionKey(
                        medicineCondition
                    )
                ) {

                    return {
                        key: key,
                        regimen: regimens[key]
                    };

                }

            }

        }

    }


    /*
        Fallback:
        partial matching.
    */

    for (
        const key of Object.keys(regimens)
    ) {

        const normalizedKey =
            normalizeConditionKey(
                key
            );


        if (
            normalizedKey.includes(
                requestedKey
            ) ||
            requestedKey.includes(
                normalizedKey
            )
        ) {

            return {
                key: key,
                regimen: regimens[key]
            };

        }

    }


    return null;

}


/* =========================================
   SELECT REGIMEN FOR MEDICINE
========================================= */

function getApplicableRegimen(
    medicine,
    condition
) {

    if (!medicine || !medicine.dosing) {
        return null;
    }


    const dosing =
        medicine.dosing;


    /*
        Condition-based dosing
    */

    if (
        dosing.type ===
        "condition_based"
    ) {

        return getConditionRegimen(
            medicine,
            condition
        );

    }


    /*
        Severity-based dosing

        We use the selected condition
        to find the corresponding
        severity regimen.
    */

    if (
        dosing.type ===
        "severity_based"
    ) {

        const result =
            getConditionRegimen(
                medicine,
                condition
            );


        if (result) {
            return result;
        }


        /*
            Fallback to first regimen
            only if there is exactly
            one regimen.
        */

        const regimens =
            dosing.regimens || {};


        const keys =
            Object.keys(
                regimens
            );


        if (
            keys.length === 1
        ) {

            return {

                key:
                    keys[0],

                regimen:
                    regimens[
                        keys[0]
                    ]

            };

        }


        return null;

    }


    /*
        Other dosing types don't need
        a condition-specific regimen.
    */

    return null;

}


/* =========================================
   CALCULATE MG DOSE
========================================= */

function calculateDosingRule(
    medicine,
    weight,
    condition
) {

    const dosing =
        medicine.dosing;


    if (
        !dosing ||
        dosing.configured !== true
    ) {

        return {

            success: false,

            message:
                "A verified dosing rule has not been configured for this medicine."

        };

    }


    const type =
        dosing.type;


    /* =====================================
       MG / KG / DOSE
    ===================================== */

    if (
        type ===
        "mg_per_kg_per_dose"
    ) {

        const minDose =
            weight *
            Number(
                dosing.minDose
            );


        const maxDose =
            weight *
            Number(
                dosing.maxDose
            );


        const maxDaily =
            Number.isFinite(
                Number(
                    dosing.maxDailyDose
                )
            )
                ? Math.min(
                    maxDose,
                    weight *
                    Number(
                        dosing.maxDailyDose
                    )
                )
                : maxDose;


        return {

            success: true,

            minMg:
                minDose,

            maxMg:
                maxDaily,

            dailyMinMg:
                minDose *
                Number(
                    dosing.maxDosesPer24Hours ||
                    1
                ),

            dailyMaxMg:
                maxDaily *
                Number(
                    dosing.maxDosesPer24Hours ||
                    1
                ),

            frequency:
                dosing.frequency ||
                "",

            dosesPerDay:
                dosing.maxDosesPer24Hours ||
                null,

            unit:
                dosing.unit ||
                "mg/kg/dose",

            regimen:
                null

        };

    }


    /* =====================================
       MG / KG / DAY
    ===================================== */

    if (
        type ===
        "mg_per_kg_per_day"
    ) {

        const minDailyMg =
            weight *
            Number(
                dosing.minDose
            );


        const maxDailyMgRaw =
            weight *
            Number(
                dosing.maxDose
            );


        const maxDailyMg =
            Number.isFinite(
                Number(
                    dosing.maxDailyDose
                )
            )
                ? Math.min(
                    maxDailyMgRaw,
                    Number(
                        dosing.maxDailyDose
                    )
                )
                : maxDailyMgRaw;


        const frequency =
            Number(
                dosing.frequency
            ) || 1;


        let minPerDose =
            minDailyMg /
            frequency;


        let maxPerDose =
            maxDailyMg /
            frequency;


        if (
            Number.isFinite(
                Number(
                    dosing.maxPerDose
                )
            )
        ) {

            minPerDose =
                Math.min(
                    minPerDose,
                    Number(
                        dosing.maxPerDose
                    )
                );

            maxPerDose =
                Math.min(
                    maxPerDose,
                    Number(
                        dosing.maxPerDose
                    )
                );

        }


        return {

            success: true,

            minMg:
                minPerDose,

            maxMg:
                maxPerDose,

            dailyMinMg:
                minDailyMg,

            dailyMaxMg:
                maxDailyMg,

            frequency:
                dosing.interval ||
                dosing.frequencyText ||
                (
                    frequency === 1
                        ? "once daily"
                        : `${frequency} times daily`
                ),

            dosesPerDay:
                frequency,

            unit:
                dosing.unit ||
                "mg/kg/day",

            regimen:
                null

        };

    }


    /* =====================================
       CONDITION / SEVERITY BASED
    ===================================== */

    if (
        type === "condition_based" ||
        type === "severity_based"
    ) {

        const selected =
            getApplicableRegimen(
                medicine,
                condition
            );


        if (!selected) {

            return {

                success: false,

                needsCondition: true,

                message:
                    "Please select the appropriate clinical condition/regimen for this medicine."

            };

        }


        const regimen =
            selected.regimen;


        /*
            Age restrictions inside regimen
        */

        const ageMonths =
            getAgeInMonths();


        if (
            Number.isFinite(
                ageMonths
            )
        ) {

            if (
                Number.isFinite(
                    regimen.minimumAgeMonths
                ) &&
                ageMonths <
                    regimen.minimumAgeMonths
            ) {

                return {

                    success: false,

                    message:
                        `This regimen is not configured for the entered age.`

                };

            }


            if (
                Number.isFinite(
                    regimen.minimumAgeYears
                ) &&
                ageMonths <
                    regimen.minimumAgeYears *
                    12
            ) {

                return {

                    success: false,

                    message:
                        `This regimen is not configured for the entered age.`

                };

            }

        }


        /*
            Determine whether the regimen
            is mg/kg/day or mg/kg/dose.

            For our current database:
            most condition-based antibiotic
            regimens are daily doses.
        */

        let doseMin;
        let doseMax;

        let dailyMin;
        let dailyMax;

        let frequency;

        let frequencyText = "";


        /*
            Explicit day-based dosing
        */

        if (
            dosing.unit ===
            "mg/kg/day"
        ) {

            const minDose =
                Number.isFinite(
                    Number(
                        regimen.minDose
                    )
                )
                    ? Number(
                        regimen.minDose
                    )
                    : Number(
                        regimen.dose
                    );


            const maxDose =
                Number.isFinite(
                    Number(
                        regimen.maxDose
                    )
                )
                    ? Number(
                        regimen.maxDose
                    )
                    : Number(
                        regimen.dose
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
                        "The selected regimen does not contain a valid pediatric dose."

                };

            }


            dailyMin =
                weight *
                minDose;


            dailyMax =
                weight *
                maxDose;


            /*
                Apply max daily dose
            */

            if (
                Number.isFinite(
                    Number(
                        regimen.maxDailyDose
                    )
                )
            ) {

                dailyMax =
                    Math.min(
                        dailyMax,
                        Number(
                            regimen.maxDailyDose
                        )
                    );

            }


            frequency =
                Number(
                    regimen.frequency
                ) || 1;


            /*
                Alternative frequency

                Example:
                cefixime = once daily OR
                divided every 12 hours.
            */

            let selectedFrequency =
                frequency;


            let alternativeFrequency =
                Number(
                    regimen.alternativeFrequency
                );


            /*
                Use primary frequency by default.
            */

            doseMin =
                dailyMin /
                selectedFrequency;


            doseMax =
                dailyMax /
                selectedFrequency;


            if (
                Number.isFinite(
                    Number(
                        regimen.maxPerDose
                    )
                )
            ) {

                doseMax =
                    Math.min(
                        doseMax,
                        Number(
                            regimen.maxPerDose
                        )
                    );

            }


            if (
                regimen.interval
            ) {

                frequencyText =
                    regimen.interval;

            }
            else if (
                selectedFrequency === 1
            ) {

                frequencyText =
                    "once daily";

            }
            else {

                frequencyText =
                    `${selectedFrequency} times daily`;

            }


            if (
                Number.isFinite(
                    alternativeFrequency
                )
            ) {

                frequencyText +=
                    ` (or divided into ${alternativeFrequency} doses/day)`;

            }


            return {

                success: true,

                minMg:
                    doseMin,

                maxMg:
                    doseMax,

                dailyMinMg:
                    dailyMin,

                dailyMaxMg:
                    dailyMax,

                frequency:
                    frequencyText,

                dosesPerDay:
                    selectedFrequency,

                unit:
                    dosing.unit,

                duration:
                    regimen.duration ||
                    "",

                regimen:
                    selected.key

            };

        }


        /*
            Dose is explicitly mg/kg/dose
        */

        const minDose =
            Number.isFinite(
                Number(
                    regimen.minDose
                )
            )
                ? Number(
                    regimen.minDose
                )
                : Number(
                    regimen.dose
                );


        const maxDose =
            Number.isFinite(
                Number(
                    regimen.maxDose
                )
            )
                ? Number(
                    regimen.maxDose
                )
                : Number(
                    regimen.dose
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
                    "The selected regimen does not contain a valid pediatric dose."

            };

        }


        doseMin =
            weight *
            minDose;


        doseMax =
            weight *
            maxDose;


        frequency =
            Number(
                regimen.frequency
            ) || 1;


        if (
            Number.isFinite(
                Number(
                    regimen.maxPerDose
                )
            )
        ) {

            doseMax =
                Math.min(
                    doseMax,
                    Number(
                        regimen.maxPerDose
                    )
                );

        }


        if (
            regimen.interval
        ) {

            frequencyText =
                regimen.interval;

        }
        else {

            frequencyText =
                frequency === 1
                    ? "once daily"
                    : `${frequency} times daily`;

        }


        return {

            success: true,

            minMg:
                doseMin,

            maxMg:
                doseMax,

            dailyMinMg:
                doseMin *
                frequency,

            dailyMaxMg:
                doseMax *
                frequency,

            frequency:
                frequencyText,

            dosesPerDay:
                frequency,

            unit:
                "mg/kg/dose",

            duration:
                regimen.duration ||
                "",

            regimen:
                selected.key

        };

    }


    /* =====================================
       UNKNOWN TYPE
    ===================================== */

    return {

        success: false,

        message:
            `Unsupported dosing type: ${type}`

    };

}


/* =========================================
   CONVERT MG TO ML
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

    if (!result) {
        return;
    }


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


    /*
        Main result
    */

    if (doseResult) {

        if (
            Math.abs(
                maxMg - minMg
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


    /*
        Unit
    */

    if (doseUnit) {

        doseUnit.textContent =
            "per dose";

    }


    /*
        Details
    */

    if (resultDetails) {

        let volumeText =
            "";


        if (
            Number.isFinite(
                minMl
            ) &&
            Number.isFinite(
                maxMl
            )
        ) {

            if (
                Math.abs(
                    maxMl - minMl
                ) < 0.01
            ) {

                volumeText =
                    `${formatNumber(minMl)} mL`;

            }
            else {

                volumeText =
                    `${formatNumber(minMl)}–${formatNumber(maxMl)} mL`;

            }

        }


        const details = [];


        if (volumeText) {

            details.push(
                `<strong>Volume:</strong> ${volumeText}`
            );

        }


        if (result.frequency) {

            details.push(
                `<strong>Frequency:</strong> ${result.frequency}`
            );

        }


        if (
            Number.isFinite(
                result.dailyMinMg
            )
        ) {

            if (
                Math.abs(
                    result.dailyMaxMg -
                    result.dailyMinMg
                ) < 0.001
            ) {

                details.push(
                    `<strong>Total daily dose:</strong> ${formatNumber(result.dailyMinMg)} mg/day`
                );

            }
            else {

                details.push(
                    `<strong>Total daily dose:</strong> ${formatNumber(result.dailyMinMg)}–${formatNumber(result.dailyMaxMg)} mg/day`
                );

            }

        }


        if (result.duration) {

            details.push(
                `<strong>Duration:</strong> ${result.duration}`
            );

        }


        if (result.regimen) {

            details.push(
                `<strong>Regimen:</strong> ${formatConditionName(result.regimen)}`
            );

        }


        if (selectedMedicine.notes) {

            details.push(
                `<strong>Note:</strong> ${selectedMedicine.notes}`
            );

        }


        resultDetails.innerHTML =
            details.join(
                "<br>"
            );

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

function saveCalculationToHistory(
    data
) {

    let history =
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

        condition:
            data.condition,

        date:
            now.toLocaleDateString(
                "en-GB"
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


    history.unshift(
        historyItem
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


    console.log(
        "Calculation saved to history:",
        historyItem
    );

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
       2. AGE
    ------------------------------------- */

    const age =
        ageInput
            ? parseFloat(
                ageInput.value
            )
            : NaN;


    const hasAge =
        Number.isFinite(
            age
        );


    if (
        hasAge &&
        age < 0
    ) {

        showValidation(
            "Please enter a valid age."
        );

        return;

    }


    /* -------------------------------------
       3. WEIGHT
    ------------------------------------- */

    const weight =
        weightInput
            ? parseFloat(
                weightInput.value
            )
            : NaN;


    const hasWeight =
        Number.isFinite(
            weight
        );


    /*
        Pediatric dose calculation requires
        body weight for the current database.
    */

    if (
        !hasWeight ||
        weight <= 0
    ) {

        showValidation(
            "Please enter the patient's weight."
        );

        return;

    }


    /* -------------------------------------
       4. AGE REQUIREMENT
    ------------------------------------- */

    if (!hasAge) {

        showValidation(
            "Please enter the patient's age."
        );

        return;

    }


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


    /* -------------------------------------
       5. CONDITION
    ------------------------------------- */

    const condition =
        conditionSelect
            ? conditionSelect.value
            : "";


    const dosingType =
        selectedMedicine.dosing
            ? selectedMedicine.dosing.type
            : "";


    if (
        (
            dosingType ===
            "condition_based"
        ||
            dosingType ===
            "severity_based"
        ) &&
        !condition
    ) {

        showValidation(
            "Please select the clinical condition before calculating the dose."
        );

        return;

    }


    /* -------------------------------------
       6. CONCENTRATION
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
       7. CALCULATE
    ------------------------------------- */

    const result =
        calculateDosingRule(
            selectedMedicine,
            weight,
            condition
        );


    if (
        !result.success
    ) {

        showValidation(
            result.message ||
            "Unable to calculate the dose."
        );

        return;

    }


    /* -------------------------------------
       8. DISPLAY
    ------------------------------------- */

    displayDoseResult(
        result,
        concentrationMg,
        concentrationMl
    );


    /* -------------------------------------
       9. SAVE HISTORY
    ------------------------------------- */

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


    let doseText;


    if (
        Math.abs(
            result.maxMg -
            result.minMg
        ) < 0.001
    ) {

        doseText =
            `${formatNumber(result.minMg)} mg`;

    }
    else {

        doseText =
            `${formatNumber(result.minMg)}–${formatNumber(result.maxMg)} mg`;

    }


    let volumeText;


    if (
        Math.abs(
            maxMl -
            minMl
        ) < 0.01
    ) {

        volumeText =
            `${formatNumber(minMl)} mL`;

    }
    else {

        volumeText =
            `${formatNumber(minMl)}–${formatNumber(maxMl)} mL`;

    }


    saveCalculationToHistory({

        medicine:
            getMedicineName(
                selectedMedicine
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
            "",

        condition:
            condition
                ? formatConditionName(
                    condition
                )
                : ""

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

    initializeConditions();

    populateMedicineSelect();

    hideValidation();

    hideResult();

    /*
        Make sure the medicine select
        reflects the current state.
    */

    if (
        selectedMedicine &&
        medicineSelect
    ) {

        medicineSelect.value =
            String(
                selectedMedicine.id
            );

    }

}


/* =========================================
   START
========================================= */

initializeCalculator();
