/* =========================================
   DoseCare
   ANTIBIOTICS DATABASE
   Pediatric Oral Liquid Medicines Only
========================================= */


/*
    IMPORTANT:

    This file contains ONLY antibiotics
    available as pediatric oral liquid
    formulations.

    DO NOT add:
    - Tablets
    - Capsules
    - Chewable tablets
    - IV injections
    - IM injections
    - Suppositories

    All dosing data must be verified against
    authoritative references before clinical use.
*/


medicines.push(

/* =========================================
   1. AMOXICILLIN
========================================= */

{
    id: "amoxicillin",

    genericName: "Amoxicillin",

    name: "Amoxicillin",

    brandNames: [
        "Amoxil"
    ],

    drugClass: [
        "Penicillin",
        "Beta-lactam",
        "Antibiotic"
    ],

    class:
        "Aminopenicillin · Beta-lactam · Antibiotic",

    conditions: [
        "acute otitis media",
        "community acquired pneumonia",
        "streptococcal pharyngitis",
        "acute bacterial sinusitis",
        "susceptible bacterial infections"
    ],

    condition:
        "Susceptible bacterial infections",

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for susceptible bacterial infections including selected respiratory tract infections, acute otitis media, streptococcal pharyngitis and other infections when clinically appropriate.",

    moa:
        "Binds to penicillin-binding proteins and inhibits bacterial cell-wall synthesis, resulting in bacterial cell lysis.",

    pediatric:
        "Pediatric dosing depends on the infection, severity, age and body weight. The indication-specific regimen should be selected before calculating the dose.",

    formulations: [

        {
            form: "oral suspension",
            concentration: "125 mg/5 mL"
        },

        {
            form: "oral suspension",
            concentration: "200 mg/5 mL"
        },

        {
            form: "oral suspension",
            concentration: "250 mg/5 mL"
        },

        {
            form: "oral suspension",
            concentration: "400 mg/5 mL"
        }

    ],

    dosing: {

        type:
            "condition_based",

        regimens: {

            "susceptible bacterial infections": {

                minDose:
                    40,

                maxDose:
                    90,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                note:
                    "Dose depends on infection and clinical severity."

            },

            "community acquired pneumonia": {

                minDose:
                    80,

                maxDose:
                    90,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    4000

            },

            "acute otitis media": {

                minDose:
                    80,

                maxDose:
                    90,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    4000

            },

            "streptococcal pharyngitis": {

                dose:
                    50,

                frequency:
                    1,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    1000,

                duration:
                    "10 days"

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            1,

        configured:
            true

    },

    indicationSpecific:
        true,

    notes:
        "Verify the indication, body weight, formulation concentration, allergy history and maximum dose. Do not use for viral infections. Reconstituted suspension storage depends on the specific product label.",

    references: [

        {
            organization:
                "World Health Organization",

            title:
                "WHO AWaRe Antibiotic Book",

            year:
                2022,

            url:
                "https://www.who.int/publications/i/item/9789240062382"
        },

        {
            organization:
                "World Health Organization",

            title:
                "Consensus Guidance on Pediatric Dosing Regimens",

            year:
                2019,

            url:
                "https://cdn.who.int/media/docs/default-source/essential-medicines/2019-eml-expert-committee/late-papers/abwg_paediatric_dosing_ab.pdf"
        }

    ]

},


/* =========================================
   2. AMOXICILLIN + CLAVULANATE
========================================= */

{
    id: "amoxicillin-clavulanate",

    genericName:
        "Amoxicillin + Clavulanate",

    name:
        "Amoxicillin + Clavulanate",

    brandNames: [
        "Augmentin"
    ],

    drugClass: [
        "Penicillin",
        "Beta-lactam",
        "Beta-lactamase inhibitor",
        "Antibiotic"
    ],

    class:
        "Aminopenicillin + Beta-lactamase inhibitor",

    conditions: [
        "acute otitis media",
        "acute bacterial sinusitis",
        "community acquired pneumonia",
        "skin and soft tissue infections",
        "susceptible bacterial infections"
    ],

    condition:
        "Susceptible beta-lactamase-producing bacterial infections",

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for susceptible bacterial infections where beta-lactamase production may compromise amoxicillin activity.",

    moa:
        "Amoxicillin inhibits bacterial cell-wall synthesis. Clavulanate inhibits susceptible bacterial beta-lactamases and protects amoxicillin from enzymatic degradation.",

    pediatric:
        "Dose is calculated using the amoxicillin component. The specific formulation must be selected carefully because different amoxicillin/clavulanate suspensions are not interchangeable.",

    formulations: [

        {
            form: "oral suspension",
            concentration: "200 mg/28.5 mg per 5 mL"
        },

        {
            form: "oral suspension",
            concentration: "400 mg/57 mg per 5 mL"
        },

        {
            form: "oral suspension",
            concentration: "600 mg/42.9 mg per 5 mL"
        }

    ],

    dosing: {

        type:
            "condition_based",

        regimens: {

            "acute otitis media": {

                dose:
                    90,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                doseComponent:
                    "amoxicillin",

                duration:
                    "10 days"

            },

            "acute bacterial sinusitis": {

                dose:
                    80,

                maxDose:
                    90,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                doseComponent:
                    "amoxicillin"

            },

            "community acquired pneumonia": {

                dose:
                    80,

                maxDose:
                    90,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                doseComponent:
                    "amoxicillin"

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            3,

        configured:
            true

    },

    indicationSpecific:
        true,

    notes:
        "Calculate the dose using the amoxicillin component. Different formulations have different clavulanate amounts and are not interchangeable on a mg-for-mg basis. Administer at the start of a meal to reduce gastrointestinal intolerance.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Amoxicillin and Clavulanate Potassium for Oral Suspension",

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=474c822b-dc3d-4a55-8159-2b4b799d535b"
        },

        {
            organization:
                "World Health Organization",

            title:
                "WHO AWaRe Antibiotic Book",

            year:
                2022,

            url:
                "https://www.who.int/publications/i/item/9789240062382"
        }

    ]

},


/* =========================================
   3. AZITHROMYCIN
========================================= */

{
    id: "azithromycin",

    genericName:
        "Azithromycin",

    name:
        "Azithromycin",

    brandNames: [
        "Zithromax",
        "Sumamed"
    ],

    drugClass: [
        "Macrolide",
        "Antibiotic"
    ],

    class:
        "Macrolide · Antibiotic",

    conditions: [
        "acute otitis media",
        "community acquired pneumonia",
        "acute bacterial sinusitis",
        "pharyngitis",
        "tonsillitis"
    ],

    condition:
        "Selected susceptible bacterial infections",

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for selected susceptible bacterial infections including acute otitis media, community-acquired pneumonia, acute bacterial sinusitis and pharyngitis/tonsillitis when appropriate.",

    moa:
        "Binds to the 50S bacterial ribosomal subunit and inhibits bacterial protein synthesis.",

    pediatric:
        "Pediatric dosing is indication-specific and depends on age and body weight.",

    formulations: [

        {
            form: "oral suspension",
            concentration: "100 mg/5 mL"
        },

        {
            form: "oral suspension",
            concentration: "200 mg/5 mL"
        }

    ],

    dosing: {

        type:
            "condition_based",

        regimens: {

            "acute otitis media": {

                minimumAgeMonths:
                    6,

                options: [

                    {
                        dose:
                            30,

                        frequency:
                            "single dose",

                        unit:
                            "mg/kg",

                        duration:
                            "1 day"
                    },

                    {
                        dose:
                            10,

                        frequency:
                            1,

                        unit:
                            "mg/kg/day",

                        duration:
                            "3 days"
                    },

                    {
                        day1:
                            10,

                        days2to5:
                            5,

                        frequency:
                            1,

                        unit:
                            "mg/kg/day",

                        duration:
                            "5 days"
                    }

                ]

            },

            "community acquired pneumonia": {

                minimumAgeMonths:
                    6,

                day1:
                    10,

                days2to5:
                    5,

                frequency:
                    1,

                unit:
                    "mg/kg/day",

                duration:
                    "5 days"

            },

            "acute bacterial sinusitis": {

                minimumAgeMonths:
                    6,

                dose:
                    10,

                frequency:
                    1,

                unit:
                    "mg/kg/day",

                duration:
                    "3 days"

            },

            "pharyngitis": {

                minimumAgeYears:
                    2,

                dose:
                    12,

                frequency:
                    1,

                unit:
                    "mg/kg/day",

                duration:
                    "5 days"

            },

            "tonsillitis": {

                minimumAgeYears:
                    2,

                dose:
                    12,

                frequency:
                    1,

                unit:
                    "mg/kg/day",

                duration:
                    "5 days"

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            6,

        configured:
            true

    },

    indicationSpecific:
        true,

    notes:
        "Shake well before each use. Oral suspension may be taken with or without food. Consider QT prolongation and clinically important drug interactions. Antibiotic selection should follow the suspected organism, indication and local antimicrobial guidance.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Azithromycin Powder for Oral Suspension",

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=59c4b783-4ff7-4269-969b-58a10e12b12b"
        },

        {
            organization:
                "World Health Organization",

            title:
                "WHO AWaRe Antibiotic Book",

            year:
                2022,

            url:
                "https://www.who.int/publications/i/item/9789240062382"
        }

    ]

},


/* =========================================
   4. CEFALEXIN
========================================= */

{
    id: "cefalexin",

    genericName:
        "Cefalexin",

    name:
        "Cefalexin",

    brandNames: [
        "Keflex"
    ],

    drugClass: [
        "Cephalosporin",
        "Beta-lactam",
        "Antibiotic"
    ],

    class:
        "First-generation Cephalosporin · Beta-lactam",

    conditions: [
        "streptococcal pharyngitis",
        "skin and soft tissue infections",
        "urinary tract infections",
        "acute otitis media",
        "susceptible bacterial infections"
    ],

    condition:
        "Susceptible bacterial infections",

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for susceptible bacterial infections including selected skin, respiratory and urinary tract infections.",

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric:
        "Pediatric dose depends on the infection, severity, age, body weight and renal function.",

    formulations: [

        {
            form: "oral suspension",
            concentration: "125 mg/5 mL"
        },

        {
            form: "oral suspension",
            concentration: "250 mg/5 mL"
        }

    ],

    dosing: {

        type:
            "condition_based",

        regimens: {

            "susceptible bacterial infections": {

                minDose:
                    25,

                maxDose:
                    50,

                frequency:
                    2,

                unit:
                    "mg/kg/day"

            },

            "streptococcal pharyngitis": {

                minDose:
                    25,

                maxDose:
                    50,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                duration:
                    "10 days"

            },

            "skin and soft tissue infections": {

                minDose:
                    25,

                maxDose:
                    50,

                frequency:
                    2,

                unit:
                    "mg/kg/day"

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            1,

        configured:
            true

    },

    indicationSpecific:
        true,

    notes:
        "Verify beta-lactam allergy history, indication, body weight, renal function and formulation concentration. Dose adjustment may be required in significant renal impairment.",

    references: [

        {
            organization:
                "World Health Organization",

            title:
                "WHO AWaRe Antibiotic Book",

            year:
                2022,

            url:
                "https://www.who.int/publications/i/item/9789240062382"
        },

        {
            organization:
                "World Health Organization",

            title:
                "Consensus Guidance on Pediatric Dosing Regimens",

            year:
                2019,

            url:
                "https://cdn.who.int/media/docs/default-source/essential-medicines/2019-eml-expert-committee/late-papers/abwg_paediatric_dosing_ab.pdf"
        }

    ]

},


/* =========================================
   5. CEFUROXIME
========================================= */

{
    id: "cefuroxime",

    genericName:
        "Cefuroxime",

    name:
        "Cefuroxime",

    brandNames: [
        "Ceftin",
        "Zinnat"
    ],

    drugClass: [
        "Cephalosporin",
        "Beta-lactam",
        "Antibiotic"
    ],

    class:
        "Second-generation Cephalosporin · Beta-lactam",

    conditions: [
        "pharyngitis",
        "tonsillitis",
        "acute otitis media",
        "acute bacterial sinusitis",
        "impetigo"
    ],

    condition:
        "Selected susceptible bacterial infections",

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for selected mild to moderate bacterial infections including pharyngitis/tonsillitis, acute otitis media, acute bacterial sinusitis and impetigo.",

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric:
        "For children 3 months to 12 years, oral suspension dosing is indication-specific.",

    formulations: [

        {
            form: "oral suspension",
            concentration: "125 mg/5 mL"
        },

        {
            form: "oral suspension",
            concentration: "250 mg/5 mL"
        }

    ],

    dosing: {

        type:
            "condition_based",

        regimens: {

            "pharyngitis": {

                dose:
                    20,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    500,

                duration:
                    "10 days"

            },

            "tonsillitis": {

                dose:
                    20,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    500,

                duration:
                    "10 days"

            },

            "acute otitis media": {

                dose:
                    30,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    1000,

                duration:
                    "10 days"

            },

            "acute bacterial sinusitis": {

                dose:
                    30,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    1000,

                duration:
                    "10 days"

            },

            "impetigo": {

                dose:
                    30,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    1000,

                duration:
                    "10 days"

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            3,

        maximumAgeYears:
            12,

        configured:
            true

    },

    indicationSpecific:
        true,

    notes:
        "Oral suspension should be administered with food. Cefuroxime tablets and suspension are not interchangeable on a mg-for-mg basis. Verify renal function and formulation concentration.",

    references: [

        {
            organization:
                "U.S. Food and Drug Administration",

            title:
                "CEFTIN (cefuroxime axetil) Prescribing Information",

            url:
                "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/050605s051%2C050672s037lbl.pdf"
        },

        {
            organization:
                "DailyMed",

            title:
                "Cefuroxime Axetil for Oral Suspension",

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=135e2dfc-eb47-4d04-a903-a081d36c267e"
        }

    ]

},


/* =========================================
   6. CEFIXIME
========================================= */

{
    id: "cefixime",

    genericName:
        "Cefixime",

    name:
        "Cefixime",

    brandNames: [
        "Suprax"
    ],

    drugClass: [
        "Cephalosporin",
        "Beta-lactam",
        "Antibiotic"
    ],

    class:
        "Third-generation Cephalosporin · Beta-lactam",

    conditions: [
        "acute otitis media",
        "pharyngitis",
        "tonsillitis",
        "urinary tract infections",
        "susceptible bacterial infections"
    ],

    condition:
        "Susceptible bacterial infections",

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for susceptible bacterial infections including acute otitis media, pharyngitis/tonsillitis and uncomplicated urinary tract infections.",

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric:
        "For children 6 months and older, dosing is generally based on body weight and may be administered once daily or divided into two doses.",

    formulations: [

        {
            form: "oral suspension",
            concentration: "100 mg/5 mL"
        },

        {
            form: "oral suspension",
            concentration: "200 mg/5 mL"
        },

        {
            form: "oral suspension",
            concentration: "500 mg/5 mL"
        }

    ],

    dosing: {

        type:
            "condition_based",

        regimens: {

            "acute otitis media": {

                dose:
                    8,

                frequency:
                    1,

                alternativeFrequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    400,

                duration:
                    "10 days"

            },

            "pharyngitis": {

                dose:
                    8,

                frequency:
                    1,

                alternativeFrequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    400,

                duration:
                    "10 days"

            },

            "tonsillitis": {

                dose:
                    8,

                frequency:
                    1,

                alternativeFrequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    400,

                duration:
                    "10 days"

            },

            "urinary tract infections": {

                dose:
                    8,

                frequency:
                    1,

                alternativeFrequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    400

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            6,

        configured:
            true

    },

    indicationSpecific:
        true,

    notes:
        "Shake oral suspension well before each dose. Verify formulation concentration, body weight and renal function. Once-daily dosing or divided every-12-hour dosing may be used according to the product labeling and clinical indication.",

    references: [

        {
            organization:
                "U.S. Food and Drug Administration",

            title:
                "SUPRAX (cefixime) Prescribing Information",

            url:
                "https://www.accessdata.fda.gov/drugsatfda_docs/label/2010/050662s027lbl.pdf"
        },

        {
            organization:
                "DailyMed",

            title:
                "Cefixime Oral Suspension",

            url:
                "https://dailymed.nlm.nih.gov/dailymed/"
        }

    ]

},


/* =========================================
   7. CLINDAMYCIN
========================================= */

{
    id: "clindamycin",

    genericName:
        "Clindamycin",

    name:
        "Clindamycin",

    brandNames: [
        "Cleocin",
        "Dalacin"
    ],

    drugClass: [
        "Lincosamide",
        "Antibiotic"
    ],

    class:
        "Lincosamide · Antibiotic",

    conditions: [
        "serious bacterial infections",
        "skin and soft tissue infections",
        "anaerobic infections",
        "streptococcal infections",
        "staphylococcal infections"
    ],

    condition:
        "Serious susceptible bacterial infections",

    route:
        "Oral",

    dosageForm:
        "Oral solution",

    indications:
        "Used for serious bacterial infections caused by susceptible organisms, including selected skin and soft tissue, streptococcal, staphylococcal and anaerobic infections.",

    moa:
        "Binds to the 50S ribosomal subunit and inhibits bacterial protein synthesis.",

    pediatric:
        "Pediatric oral dosing is divided into three or four equal doses and depends on infection severity.",

    formulations: [

        {
            form: "oral solution",
            concentration: "75 mg/5 mL"
        }

    ],

    dosing: {

        type:
            "severity_based",

        regimens: {

            "serious infections": {

                minDose:
                    8,

                maxDose:
                    12,

                frequencyOptions: [
                    3,
                    4
                ],

                unit:
                    "mg/kg/day"

            },

            "severe infections": {

                minDose:
                    13,

                maxDose:
                    16,

                frequencyOptions: [
                    3,
                    4
                ],

                unit:
                    "mg/kg/day"

            },

            "more severe infections": {

                minDose:
                    17,

                maxDose:
                    25,

                frequencyOptions: [
                    3,
                    4
                ],

                unit:
                    "mg/kg/day"

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            0,

        configured:
            true

    },

    indicationSpecific:
        false,

    notes:
        "Clindamycin should be reserved for appropriate bacterial infections because of the risk of severe antibiotic-associated diarrhea and C. difficile colitis. Stop and seek medical assessment if significant or persistent diarrhea develops. Oral solution should be shaken well before use and stored according to the product label.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Clindamycin Palmitate Hydrochloride for Oral Solution",

            url:
                "https://dailymed.nlm.nih.gov/dailymed/getFile.cfm?setid=28ba03fd-0f9c-49c6-9bfb-cda5417801c6&type=pdf"
        },

        {
            organization:
                "World Health Organization",

            title:
                "WHO AWaRe Antibiotic Book",

            year:
                2022,

            url:
                "https://www.who.int/publications/i/item/9789240062382"
        }

    ]

}

);


/* =========================================
   END OF ANTIBIOTICS DATABASE
========================================= */
