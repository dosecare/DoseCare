/* =========================================
   DoseCare
   ANTIBIOTICS DATABASE
   Pediatric Oral Liquid Medicines Only
========================================= */

/*
    IMPORTANT:

    This file contains ONLY antibiotics
    represented as pediatric oral liquid
    formulations.

    DO NOT add:
    - Tablets
    - Capsules
    - Chewable tablets
    - IV injections
    - IM injections
    - Suppositories

    Dosing data must be verified against
    current authoritative references before
    clinical use.
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
        "Treatment of susceptible bacterial infections including selected respiratory tract, ear, skin and genitourinary infections when clinically appropriate.",

    moa:
        "Binds to penicillin-binding proteins and inhibits bacterial cell-wall synthesis, leading to bacterial cell lysis.",

    pediatric:
        "Pediatric dosing is indication-specific and should be calculated using body weight and the selected formulation concentration.",

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
                    25,

                maxDose:
                    50,

                frequency:
                    3,

                unit:
                    "mg/kg/day",

                duration:
                    "7-14 days",

                note:
                    "General pediatric dosing range; select the indication-specific regimen whenever available."

            },

            "community acquired pneumonia": {

                dose:
                    90,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    4000,

                duration:
                    "Indication dependent",

                note:
                    "High-dose amoxicillin regimen may be used when clinically indicated."

            },

            "acute otitis media": {

                dose:
                    90,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                maxDailyDose:
                    4000,

                duration:
                    "Indication dependent",

                note:
                    "High-dose regimen; treatment duration depends on age and clinical circumstances."

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
        "Verify indication, body weight, allergy history, formulation concentration and maximum dose. Do not use for viral infections. Reconstituted suspension storage depends on the specific product label.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Amoxicillin for Oral Suspension",

            year:
                2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=06e5c07d-d95c-4955-8d35-a4703ca2359e"
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
        "recurrent acute otitis media",
        "persistent acute otitis media",
        "susceptible beta-lactamase producing bacterial infections"
    ],

    condition:
        "Susceptible beta-lactamase-producing bacterial infections",

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for selected susceptible bacterial infections where beta-lactamase production may compromise amoxicillin activity.",

    moa:
        "Amoxicillin inhibits bacterial cell-wall synthesis. Clavulanate inhibits susceptible bacterial beta-lactamases and protects amoxicillin from enzymatic degradation.",

    pediatric:
        "Dose is calculated using the amoxicillin component. The 600 mg/42.9 mg per 5 mL formulation is not interchangeable with the 200 mg/28.5 mg or 400 mg/57 mg per 5 mL formulations.",

    formulations: [

        {
            form: "oral suspension",
            concentration: "600 mg/42.9 mg per 5 mL",
            doseComponent:
                "amoxicillin"
        }

    ],

    dosing: {

        type:
            "condition_based",

        regimens: {

            "recurrent acute otitis media": {

                dose:
                    90,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                doseComponent:
                    "amoxicillin",

                maxDailyDose:
                    3600,

                duration:
                    "10 days"

            },

            "persistent acute otitis media": {

                dose:
                    90,

                frequency:
                    2,

                unit:
                    "mg/kg/day",

                doseComponent:
                    "amoxicillin",

                maxDailyDose:
                    3600,

                duration:
                    "10 days"

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            3,

        maximumWeightKg:
            40,

        configured:
            true

    },

    indicationSpecific:
        true,

    notes:
        "Dose is based on the amoxicillin component. The 600 mg/42.9 mg per 5 mL formulation provides 90 mg/kg/day of amoxicillin divided every 12 hours. Take at the start of a meal. Do not substitute different amoxicillin/clavulanate suspension concentrations on a mg-for-mg basis.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Amoxicillin and Clavulanate Potassium for Oral Suspension",

            year:
                2025,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=26992a71-e4a0-4e41-aa3c-3219868c2226"
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
        "Pediatric dosing is indication-specific and depends on age, body weight and selected regimen.",

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
                        type:
                            "single_dose",

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
                        type:
                            "short_course",

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
                        type:
                            "five_day_regimen",

                        day1Dose:
                            10,

                        days2to5Dose:
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

                type:
                    "five_day_regimen",

                day1Dose:
                    10,

                days2to5Dose:
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
        "Shake well before each use. May be taken with or without food. The 5-day regimen requires a different dose on Day 1 and Days 2-5. Consider QT prolongation and clinically important drug interactions.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Azithromycin for Oral Suspension",

            year:
                2024,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=2c9de2e9-c20c-4660-a272-a22019f9fb02"
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
        "acute otitis media",
        "streptococcal pharyngitis",
        "skin and soft tissue infections",
        "urinary tract infections",
        "susceptible bacterial infections",
        "severe susceptible bacterial infections"
    ],

    condition:
        "Susceptible bacterial infections",

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for susceptible respiratory tract, otitis media, skin and skin-structure, bone and genitourinary infections.",

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric:
        "For pediatric patients over 1 year of age, dosing depends on infection type and severity and is divided into equal doses.",

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

            "acute otitis media": {

                minDose:
                    75,

                maxDose:
                    100,

                frequency:
                    4,

                unit:
                    "mg/kg/day",

                duration:
                    "7-14 days"

            },

            "streptococcal pharyngitis": {

                minDose:
                    25,

                maxDose:
                    50,

                frequency:
                    4,

                unit:
                    "mg/kg/day",

                duration:
                    "10 days minimum"

            },

            "susceptible bacterial infections": {

                minDose:
                    25,

                maxDose:
                    50,

                frequency:
                    4,

                unit:
                    "mg/kg/day",

                duration:
                    "7-14 days"

            },

            "severe susceptible bacterial infections": {

                minDose:
                    50,

                maxDose:
                    100,

                frequency:
                    4,

                unit:
                    "mg/kg/day",

                duration:
                    "Indication dependent"

            }

        },

        route:
            "oral",

        minimumAgeYears:
            1,

        configured:
            true

    },

    indicationSpecific:
        true,

    notes:
        "DailyMed specifies pediatric use over 1 year of age. Otitis media dosing is 75-100 mg/kg/day divided every 6 hours. Other indications generally use 25-50 mg/kg/day; severe infections may require 50-100 mg/kg/day. Renal dose adjustment may be required.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Cephalexin for Oral Suspension",

            year:
                2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=655f38e8-1c4d-4cbc-9f52-bb881f065b2d"
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
        "Used for selected susceptible bacterial infections including pharyngitis/tonsillitis, acute otitis media, acute bacterial sinusitis and impetigo.",

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric:
        "For pediatric patients 3 months to 12 years, dosing is indication-specific and administered twice daily.",

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
        "Shake well before use and administer with food. Cefuroxime suspension and tablets are not interchangeable on a mg-for-mg basis. Verify renal function and formulation concentration.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Cefuroxime Axetil for Oral Suspension",

            year:
                2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=135e2dfc-eb47-4d04-a903-a081d36c267e"
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
        "uncomplicated urinary tract infections",
        "susceptible bacterial infections"
    ],

    condition:
        "Susceptible bacterial infections",

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for susceptible infections including otitis media, pharyngitis/tonsillitis and uncomplicated urinary tract infections.",

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric:
        "For pediatric patients 6 months and older, the recommended dose is 8 mg/kg/day, administered once daily or as 4 mg/kg every 12 hours.",

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
            "weight_based",

        regimen: {

            dose:
                8,

            frequency:
                1,

            alternativeFrequency:
                2,

            alternativeDose:
                4,

            unit:
                "mg/kg/day",

            maxDailyDose:
                400

        },

        conditions:

            [
                "acute otitis media",
                "pharyngitis",
                "tonsillitis",
                "uncomplicated urinary tract infections"
            ],

        route:
            "oral",

        minimumAgeMonths:
            6,

        configured:
            true

    },

    indicationSpecific:
        false,

    notes:
        "Recommended pediatric dose is 8 mg/kg/day. It may be administered once daily or divided as 4 mg/kg every 12 hours. For Streptococcus pyogenes infections, treatment should be given for at least 10 days. Verify renal function when clinically appropriate.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Cefixime for Oral Suspension",

            year:
                2024,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/getFile.cfm?setid=068e6edd-a5fe-40d8-8dcf-ac82b78dced4&type=pdf"
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
        "Pediatric oral dosing is based on total body weight and divided into 3 or 4 equal doses according to infection severity.",

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
        "Dose is based on total body weight. Serious infections: 8-12 mg/kg/day; severe infections: 13-16 mg/kg/day; more severe infections: 17-25 mg/kg/day, divided into 3 or 4 equal doses. Significant diarrhea may require discontinuation and medical assessment because of the risk of C. difficile-associated disease.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Clindamycin Palmitate Hydrochloride for Oral Solution",

            year:
                2024,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/getFile.cfm?setid=b35e3714-44d1-4e6a-a124-555ad259fec1&type=pdf"
        }

    ]

}

);


/* =========================================
   END OF ANTIBIOTICS DATABASE
========================================= */
