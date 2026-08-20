/* =========================================
   DoseCare
   RESPIRATORY SYSTEM DATABASE
========================================= */

/*
    System:
    Respiratory

    Main pediatric medicines included:

    1. Salbutamol
    2. Budesonide
    3. Ipratropium
    4. Montelukast

    IMPORTANT:
    These medicines are added to the central
    DoseCare database automatically.

    Do NOT add them directly to medicine.js.
*/


const respiratoryMedicines = [


    /* =========================================
       SALBUTAMOL
       Albuterol
    ========================================= */

    {

        id:
            "salbutamol",

        genericName:
            "Salbutamol",

        name:
            "Salbutamol",

        brandNames: [
            "Ventolin",
            "ProAir",
            "Airomir"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "Short-acting beta2 agonist",
            "Bronchodilator",
            "SABA"
        ],

        class:
            "Short-acting β2-agonist · Bronchodilator",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "asthma",
            "acute bronchospasm",
            "reversible airway obstruction",
            "wheezing"
        ],

        condition:
            "Asthma · Acute bronchospasm",

        route:
            "Inhalation",

        dosageForms: [
            "metered-dose inhaler",
            "nebulizer solution"
        ],

        commonPediatricConcentrations: [
            "100 micrograms/actuation",
            "0.63 mg/3 mL",
            "1.25 mg/3 mL",
            "5 mg/mL nebulizer solution"
        ],


        indications:
            "Relief of bronchospasm and wheezing associated with asthma and reversible obstructive airway disease.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Selective stimulation of β2-adrenergic receptors in bronchial smooth muscle causes relaxation of airway smooth muscle and bronchodilation.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Dose depends on the inhaled formulation, age and clinical severity. Inhaled salbutamol is generally preferred over systemic administration for acute bronchospasm.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "age_and_formulation_based",

            regimens: {

                "nebulizer_2_to_12_years": {

                    minimumAgeYears:
                        2,

                    maximumAgeYears:
                        12,

                    options: [

                        {
                            dose:
                                0.63,

                            unit:
                                "mg/dose",

                            frequency:
                                "3–4 times daily as needed"
                        },

                        {
                            dose:
                                1.25,

                            unit:
                                "mg/dose",

                            frequency:
                                "3–4 times daily as needed"
                        }

                    ]

                },

                "inhaler": {

                    options: [

                        {
                            dose:
                                1,

                            unit:
                                "puff",

                            frequency:
                                "as directed"
                        },

                        {
                            dose:
                                2,

                            unit:
                                "puffs",

                            frequency:
                                "as directed"
                        }

                    ]

                }

            },

            route:
                "inhalation",

            minimumAgeMonths:
                24,

            configured:
                true

        },


        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [
            "Hypersensitivity to salbutamol or any component"
        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [
            "Tachycardia",
            "Cardiac arrhythmias",
            "Hyperthyroidism",
            "Diabetes mellitus",
            "Hypokalemia",
            "Paradoxical bronchospasm"
        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [
            "Tremor",
            "Nervousness",
            "Headache",
            "Tachycardia",
            "Palpitations",
            "Hypokalemia",
            "Muscle cramps"
        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Salbutamol is a reliever/rescue bronchodilator and does not replace controller therapy for persistent asthma. Excessive use may indicate poor asthma control. Verify the inhaler or nebulizer concentration before calculating the dose.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model List of Essential Medicines for Children — 10th List",

                year:
                    2025,

                url:
                    "https://www.who.int/publications/i/item/B09475"
            },

            {
                organization:
                    "DailyMed",

                title:
                    "Albuterol Sulfate Inhalation Solution",

                year:
                    2026,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4e48ccbe-3ec0-4bf2-be28-83eb9baa63d6"
            }

        ]

    },


    /* =========================================
       BUDESONIDE
    ========================================= */

    {

        id:
            "budesonide",

        genericName:
            "Budesonide",

        name:
            "Budesonide",

        brandNames: [
            "Pulmicort"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "Inhaled corticosteroid",
            "ICS",
            "Anti-inflammatory"
        ],

        class:
            "Inhaled Corticosteroid · Anti-inflammatory",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "asthma",
            "persistent asthma",
            "airway inflammation"
        ],

        condition:
            "Asthma · Airway inflammation",

        route:
            "Inhalation",

        dosageForms: [
            "nebulizer suspension",
            "dry powder inhaler",
            "metered-dose inhaler"
        ],

        commonPediatricConcentrations: [
            "0.25 mg/2 mL",
            "0.5 mg/2 mL",
            "100 micrograms/actuation",
            "200 micrograms/actuation"
        ],


        indications:
            "Maintenance treatment and prophylactic therapy of asthma in appropriate pediatric patients.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Activates glucocorticoid receptors and reduces airway inflammation, inflammatory cell activity and mediator release, improving airway responsiveness and asthma control.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Nebulized budesonide is used for maintenance treatment of asthma in children 12 months to 8 years. It is not a rescue medicine for acute bronchospasm.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "age_and_previous_therapy_based",

            regimens: {

                "bronchodilator_only": {

                    minimumAgeMonths:
                        12,

                    maximumAgeYears:
                        8,

                    options: [

                        {
                            dose:
                                0.5,

                            unit:
                                "mg/day",

                            frequency:
                                "once daily"
                        },

                        {
                            dose:
                                0.25,

                            unit:
                                "mg/dose",

                            frequency:
                                "twice daily"
                        }

                    ]

                },

                "previous_inhaled_corticosteroid": {

                    minimumAgeMonths:
                        12,

                    maximumAgeYears:
                        8,

                    options: [

                        {
                            dose:
                                0.5,

                            unit:
                                "mg/day",

                            frequency:
                                "once daily"
                        },

                        {
                            dose:
                                0.25,

                            unit:
                                "mg/dose",

                            frequency:
                                "twice daily"
                        },

                        {
                            dose:
                                0.5,

                            unit:
                                "mg/dose",

                            frequency:
                                "twice daily"
                        }

                    ]

                },

                "previous_oral_corticosteroid": {

                    minimumAgeMonths:
                        12,

                    maximumAgeYears:
                        8,

                    options: [

                        {
                            dose:
                                0.5,

                            unit:
                                "mg/dose",

                            frequency:
                                "twice daily"
                        },

                        {
                            dose:
                                1,

                            unit:
                                "mg/day",

                            frequency:
                                "once daily"
                        }

                    ]

                }

            },

            route:
                "inhalation",

            minimumAgeMonths:
                12,

            maximumAgeYears:
                8,

            configured:
                true

        },


        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [
            "Hypersensitivity to budesonide or formulation components"
        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [
            "Growth suppression with long-term corticosteroid exposure",
            "Oral candidiasis",
            "Adrenal suppression with high exposure",
            "Reduced bone mineral density with prolonged use",
            "Tuberculosis or untreated systemic infection"
        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [
            "Oral candidiasis",
            "Hoarseness",
            "Cough",
            "Throat irritation",
            "Growth effects with prolonged use",
            "Adrenal suppression at high exposure"
        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Budesonide is a controller medicine, not a rescue medicine. Rinse the mouth after inhalation to reduce the risk of oral candidiasis. Use the lowest effective maintenance dose.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model List of Essential Medicines for Children — 10th List",

                year:
                    2025,

                url:
                    "https://www.who.int/publications/i/item/B09475"
            },

            {
                organization:
                    "DailyMed",

                title:
                    "Budesonide Inhalation Suspension",

                year:
                    2026,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e8ef9489-83a2-4817-b21c-ea3fecd8c8dd"
            }

        ]

    },


    /* =========================================
       IPRATROPIUM
    ========================================= */

    {

        id:
            "ipratropium",

        genericName:
            "Ipratropium",

        name:
            "Ipratropium",

        brandNames: [
            "Atrovent"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "Anticholinergic",
            "Muscarinic antagonist",
            "Bronchodilator"
        ],

        class:
            "Anticholinergic · Bronchodilator",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "acute asthma",
            "acute bronchospasm",
            "airway obstruction"
        ],

        condition:
            "Acute bronchospasm · Asthma",

        route:
            "Inhalation",

        dosageForms: [
            "nebulizer solution",
            "metered-dose inhaler"
        ],

        commonPediatricConcentrations: [
            "0.25 mg/mL",
            "0.5 mg/2 mL",
            "17–18 micrograms/actuation"
        ],


        indications:
            "Used as an inhaled anticholinergic bronchodilator, particularly as an adjunct to beta2-agonist therapy in acute severe bronchospasm.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Blocks muscarinic acetylcholine receptors in airway smooth muscle, reducing vagally mediated bronchoconstriction and producing bronchodilation.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "In acute severe asthma, ipratropium may be used as an adjunct to inhaled beta2-agonist therapy. It is not generally used as the sole long-term controller treatment for asthma.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "age_based",

            regimens: {

                "children_12_years_and_younger": {

                    maximumAgeYears:
                        12,

                    dose:
                        0.25,

                    unit:
                        "mg/dose",

                    frequency:
                        "every 20 minutes for up to 3 doses",

                    indication:
                        "acute severe bronchospasm / severe asthma"
                },

                "children_over_12_years": {

                    minimumAgeYears:
                        13,

                    dose:
                        0.5,

                    unit:
                        "mg/dose",

                    frequency:
                        "every 20 minutes for up to 3 doses",

                    indication:
                        "acute severe bronchospasm / severe asthma"
                }

            },

            route:
                "inhalation",

            configured:
                true

        },


        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [
            "Hypersensitivity to ipratropium",
            "Hypersensitivity to atropine-like substances"
        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [
            "Glaucoma",
            "Urinary retention",
            "Prostatic obstruction",
            "Hypersensitivity to atropine derivatives"
        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [
            "Dry mouth",
            "Throat irritation",
            "Headache",
            "Blurred vision if aerosol contacts eyes",
            "Urinary retention",
            "Paradoxical bronchospasm"
        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Ipratropium is mainly an adjunct in acute severe bronchospasm rather than a routine standalone asthma controller. Avoid aerosol contact with the eyes because of the risk of ocular adverse effects.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {
                organization:
                    "American Academy of Pediatrics",

                title:
                    "Asthma management and acute exacerbation medication guidance",

                year:
                    2020,

                url:
                    "https://publications.aap.org/pediatrics/article/145/1/e20193450/36946"
            },

            {
                organization:
                    "Saudi Food and Drug Authority",

                title:
                    "Ipratropium Bromide — Product Information",

                url:
                    "https://sdi.sfda.gov.sa/home/Result?drugId=7849"
            }

        ]

    },


    /* =========================================
       MONTELUKAST
    ========================================= */

    {

        id:
            "montelukast",

        genericName:
            "Montelukast",

        name:
            "Montelukast",

        brandNames: [
            "Singulair"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "Leukotriene receptor antagonist",
            "LTRA",
            "Anti-asthmatic"
        ],

        class:
            "Leukotriene Receptor Antagonist · Anti-asthmatic",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "asthma",
            "exercise-induced bronchoconstriction",
            "allergic rhinitis"
        ],

        condition:
            "Asthma · Allergic rhinitis",

        route:
            "Oral",

        dosageForms: [
            "chewable tablet",
            "oral granules",
            "tablet"
        ],

        commonPediatricConcentrations: [
            "4 mg",
            "5 mg",
            "10 mg"
        ],


        indications:
            "Used for prophylaxis and chronic treatment of asthma in appropriate pediatric patients and for selected allergic rhinitis indications. It is not a treatment for an acute asthma attack.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Selectively blocks the cysteinyl leukotriene receptor CysLT1, reducing leukotriene-mediated bronchoconstriction, airway edema and mucus production.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Dose is age-based rather than weight-based. Asthma dosing is once daily in the evening. Montelukast should not be used as a rescue medicine for acute bronchospasm.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "age_based",

            regimens: {

                "asthma_12_to_23_months": {

                    minimumAgeMonths:
                        12,

                    maximumAgeMonths:
                        23,

                    dose:
                        4,

                    unit:
                        "mg",

                    dosageForm:
                        "oral granules",

                    frequency:
                        "once daily in the evening"

                },

                "asthma_2_to_5_years": {

                    minimumAgeYears:
                        2,

                    maximumAgeYears:
                        5,

                    dose:
                        4,

                    unit:
                        "mg",

                    dosageForm:
                        "chewable tablet or oral granules",

                    frequency:
                        "once daily in the evening"

                },

                "asthma_6_to_14_years": {

                    minimumAgeYears:
                        6,

                    maximumAgeYears:
                        14,

                    dose:
                        5,

                    unit:
                        "mg",

                    dosageForm:
                        "chewable tablet",

                    frequency:
                        "once daily in the evening"

                },

                "asthma_15_years_and_older": {

                    minimumAgeYears:
                        15,

                    dose:
                        10,

                    unit:
                        "mg",

                    dosageForm:
                        "tablet",

                    frequency:
                        "once daily in the evening"

                },

                "seasonal_allergic_rhinitis": {

                    minimumAgeYears:
                        2,

                    dose:
                        "age_based",

                    frequency:
                        "once daily"

                },

                "perennial_allergic_rhinitis": {

                    minimumAgeMonths:
                        6,

                    dose:
                        "age_based",

                    frequency:
                        "once daily"

                }

            },

            route:
                "oral",

            minimumAgeMonths:
                12,

            configured:
                true

        },


        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [
            "Hypersensitivity to montelukast"
        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [
            "Neuropsychiatric symptoms",
            "Behavioral changes",
            "Sleep disturbances",
            "Mood changes",
            "Suicidal thoughts or behavior"
        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [
            "Headache",
            "Abdominal pain",
            "Neuropsychiatric effects",
            "Sleep disturbances",
            "Mood or behavioral changes"
        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Montelukast is not a rescue medicine for an acute asthma attack. Because of the risk of serious neuropsychiatric events, particularly with allergic-rhinitis use, therapy should be reserved for appropriate patients when alternatives are inadequate or not tolerated.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {
                organization:
                    "DailyMed",

                title:
                    "Montelukast Sodium",

                year:
                    2026,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=901385e5-7384-4c28-a36a-7dd84c36f5fd"
            },

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model List of Essential Medicines for Children",

                year:
                    2025,

                url:
                    "https://www.who.int/publications/i/item/B09475"
            }

        ]

    }

];


/* =========================================
   ADD RESPIRATORY MEDICINES
   TO CENTRAL DATABASE
========================================= */

respiratoryMedicines.forEach(
    medicine => {

        if (
            !medicines.some(
                existingMedicine =>
                    existingMedicine.id ===
                    medicine.id
            )
        ) {

            medicines.push(
                medicine
            );

        }

    }
);
