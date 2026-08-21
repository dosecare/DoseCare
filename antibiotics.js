/* =========================================
   DoseCare
   ANTIBIOTICS DATABASE
   Pediatric Oral Liquid Medicines Only

   NEW DOSING SYSTEM
   -----------------------------------------
   - NO clinical-condition selection
   - NO condition-based dosing
   - User selects medicine
   - User selects available concentration
   - Calculator uses general pediatric dosing rule
   - Oral liquids ONLY
========================================= */


/*
    IMPORTANT
    -----------------------------------------
    This database contains pediatric oral
    liquid antibiotics only.

    Allowed dosage forms:
    - Oral suspension
    - Oral solution

    NOT INCLUDED:
    - Tablets
    - Capsules
    - Chewable tablets
    - IV injections
    - IM injections
    - Suppositories

    Dosing data must be verified against
    current authoritative references before
    clinical use.

    The calculator provides a general/default
    pediatric dosing calculation.

    Some antibiotics require indication-specific,
    severity-specific, renal-function-specific,
    or organism-specific dosing.
========================================= */


medicines.push(


/* =========================================
   1. AMOXICILLIN
========================================= */

{
    id: "amoxicillin",

    genericName:
        "Amoxicillin",

    name:
        "Amoxicillin",

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

    /*
        Conditions are kept ONLY as
        informational indications.

        They are NOT used by the calculator.
    */

    conditions: [
        "acute otitis media",
        "community acquired pneumonia",
        "streptococcal pharyngitis",
        "acute bacterial sinusitis",
        "susceptible bacterial infections"
    ],

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for susceptible bacterial infections including selected respiratory tract, ear, skin and genitourinary infections when clinically appropriate.",

    moa:
        "Binds to penicillin-binding proteins and inhibits bacterial cell-wall synthesis, leading to bacterial cell lysis.",

    pediatric:
        "General pediatric dosing is commonly weight-based and divided into multiple daily doses. The appropriate regimen may vary according to infection and clinical circumstances.",

    formulations: [

        {
            form:
                "oral suspension",

            concentration:
                "125 mg/5 mL",

            mgPer5mL:
                125
        },

        {
            form:
                "oral suspension",

            concentration:
                "200 mg/5 mL",

            mgPer5mL:
                200
        },

        {
            form:
                "oral suspension",

            concentration:
                "250 mg/5 mL",

            mgPer5mL:
                250
        },

        {
            form:
                "oral suspension",

            concentration:
                "400 mg/5 mL",

            mgPer5mL:
                400
        }

    ],

    /*
        GENERAL PEDIATRIC DOSING

        25-50 mg/kg/day
        divided into 3 doses

        NOTE:
        Higher indication-specific doses may
        be required for certain infections.
    */

    dosing: {

        type:
            "mg_per_kg_per_day",

        minDose:
            25,

        maxDose:
            50,

        frequency:
            3,

        unit:
            "mg/kg/day",

        duration:
            "Usually 7-14 days depending on indication",

        minimumAgeMonths:
            1,

        configured:
            true

    },

    indicationSpecific:
        false,

    notes:
        "General pediatric dosing range stored for calculator use. Some infections require higher or indication-specific dosing. Verify the indication, allergy history, renal function when appropriate, body weight and formulation concentration. Shake suspension well before use. Do not use for viral infections.",

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
    id:
        "amoxicillin-clavulanate",

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
        "sinusitis",
        "respiratory tract infections",
        "skin and soft tissue infections",
        "susceptible beta-lactamase producing infections"
    ],

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for selected susceptible bacterial infections where beta-lactamase production may compromise amoxicillin activity.",

    moa:
        "Amoxicillin inhibits bacterial cell-wall synthesis. Clavulanate inhibits susceptible bacterial beta-lactamases and protects amoxicillin from enzymatic degradation.",

    pediatric:
        "Pediatric dosing is calculated using the amoxicillin component. Different formulations are not interchangeable on a mg-for-mg basis.",

    formulations: [

        {
            form:
                "oral suspension",

            concentration:
                "600 mg/42.9 mg per 5 mL",

            mgPer5mL:
                600,

            doseComponent:
                "amoxicillin"
        }

    ],

    /*
        GENERAL CALCULATOR REGIMEN

        Uses amoxicillin component.

        IMPORTANT:
        The 600/42.9 mg per 5 mL formulation
        is associated with high-dose regimens
        for selected indications.

        Since the new calculator does not ask
        for clinical condition, the displayed
        regimen must be treated as a general
        calculator reference and not as a
        universal indication-specific prescription.
    */

    dosing: {

        type:
            "mg_per_kg_per_day",

        minDose:
            25,

        maxDose:
            45,

        frequency:
            2,

        unit:
            "mg/kg/day",

        doseComponent:
            "amoxicillin",

        duration:
            "Usually indication dependent",

        minimumAgeMonths:
            3,

        maximumWeightKg:
            40,

        configured:
            true

    },

    indicationSpecific:
        false,

    notes:
        "Dose is calculated using the amoxicillin component. Different amoxicillin/clavulanate suspension concentrations are NOT interchangeable on a mg-for-mg basis. The 600 mg/42.9 mg per 5 mL formulation has specific high-dose indications. Give at the start of a meal. Verify the formulation before calculating.",

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
    id:
        "azithromycin",

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

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for selected susceptible bacterial infections when clinically appropriate.",

    moa:
        "Binds to the 50S bacterial ribosomal subunit and inhibits bacterial protein synthesis.",

    pediatric:
        "Pediatric dosing is weight-based. Regimen and duration vary according to indication.",

    formulations: [

        {
            form:
                "oral suspension",

            concentration:
                "100 mg/5 mL",

            mgPer5mL:
                100
        },

        {
            form:
                "oral suspension",

            concentration:
                "200 mg/5 mL",

            mgPer5mL:
                200
        }

    ],

    /*
        GENERAL CALCULATOR REGIMEN

        Standard weight-based regimen:

        10 mg/kg once daily

        Duration is intentionally displayed
        as indication dependent because different
        infections use different regimens.
    */

    dosing: {

        type:
            "mg_per_kg_per_dose",

        minDose:
            10,

        maxDose:
            10,

        frequency:
            1,

        unit:
            "mg/kg/dose",

        duration:
            "Regimen and duration are indication dependent",

        minimumAgeMonths:
            6,

        configured:
            true

    },

    indicationSpecific:
        false,

    notes:
        "General pediatric weight-based regimen. Azithromycin may use different regimens depending on indication, including short-course schedules and single-dose therapy. Shake well before use. May be taken with or without food. Consider QT prolongation and clinically important drug interactions.",

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
    id:
        "cefalexin",

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
        "susceptible bacterial infections"
    ],

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for susceptible respiratory tract, otitis media, skin and skin-structure, bone and genitourinary infections.",

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric:
        "Pediatric dosing depends on infection type and severity and is generally divided into equal doses.",

    formulations: [

        {
            form:
                "oral suspension",

            concentration:
                "125 mg/5 mL",

            mgPer5mL:
                125
        },

        {
            form:
                "oral suspension",

            concentration:
                "250 mg/5 mL",

            mgPer5mL:
                250
        }

    ],

    dosing: {

        type:
            "mg_per_kg_per_day",

        minDose:
            25,

        maxDose:
            50,

        frequency:
            4,

        unit:
            "mg/kg/day",

        duration:
            "Usually 7-14 days depending on indication",

        minimumAgeYears:
            1,

        configured:
            true

    },

    indicationSpecific:
        false,

    notes:
        "General pediatric dosing range. Certain infections, including otitis media or severe infections, may require higher doses. Renal dose adjustment may be required. Verify age, weight, indication and renal function when clinically appropriate.",

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
    id:
        "cefuroxime",

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

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for selected susceptible bacterial infections.",

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric:
        "Pediatric oral dosing is weight-based and generally administered twice daily.",

    formulations: [

        {
            form:
                "oral suspension",

            concentration:
                "125 mg/5 mL",

            mgPer5mL:
                125
        },

        {
            form:
                "oral suspension",

            concentration:
                "250 mg/5 mL",

            mgPer5mL:
                250
        }

    ],

    dosing: {

        type:
            "mg_per_kg_per_day",

        minDose:
            20,

        maxDose:
            30,

        frequency:
            2,

        unit:
            "mg/kg/day",

        maxDailyDose:
            1000,

        duration:
            "Usually 5-10 days depending on indication",

        minimumAgeMonths:
            3,

        maximumAgeYears:
            12,

        configured:
            true

    },

    indicationSpecific:
        false,

    notes:
        "General pediatric dosing range. Some indications use 20 mg/kg/day while others may require 30 mg/kg/day. Shake well before use and administer with food. Cefuroxime suspension and tablets are not interchangeable on a mg-for-mg basis. Verify renal function when clinically appropriate.",

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
    id:
        "cefixime",

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

    route:
        "Oral",

    dosageForm:
        "Oral suspension",

    indications:
        "Used for selected susceptible bacterial infections including otitis media, pharyngitis/tonsillitis and uncomplicated urinary tract infections.",

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric:
        "Recommended pediatric dosing is 8 mg/kg/day, administered once daily or divided as 4 mg/kg every 12 hours.",

    formulations: [

        {
            form:
                "oral suspension",

            concentration:
                "100 mg/5 mL",

            mgPer5mL:
                100
        },

        {
            form:
                "oral suspension",

            concentration:
                "200 mg/5 mL",

            mgPer5mL:
                200
        },

        {
            form:
                "oral suspension",

            concentration:
                "500 mg/5 mL",

            mgPer5mL:
                500
        }

    ],

    dosing: {

        type:
            "mg_per_kg_per_day",

        minDose:
            8,

        maxDose:
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
            400,

        duration:
            "Usually indication dependent",

        minimumAgeMonths:
            6,

        configured:
            true

    },

    indicationSpecific:
        false,

    notes:
        "Recommended pediatric dose is 8 mg/kg/day. It may be administered once daily or divided as 4 mg/kg every 12 hours. For Streptococcus pyogenes infections, treatment should generally continue for at least 10 days. Verify renal function when clinically appropriate.",

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
    id:
        "clindamycin",

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

    route:
        "Oral",

    dosageForm:
        "Oral solution",

    indications:
        "Used for serious susceptible bacterial infections including selected skin, soft tissue, streptococcal, staphylococcal and anaerobic infections.",

    moa:
        "Binds to the 50S ribosomal subunit and inhibits bacterial protein synthesis.",

    pediatric:
        "Pediatric oral dosing is based on total body weight and divided into 3 or 4 equal doses according to infection severity.",

    formulations: [

        {
            form:
                "oral solution",

            concentration:
                "75 mg/5 mL",

            mgPer5mL:
                75
        }

    ],

    /*
        Because severity is no longer selected
        by the user, the calculator uses the
        general lower-to-upper pediatric range.
    */

    dosing: {

        type:
            "mg_per_kg_per_day",

        minDose:
            8,

        maxDose:
            25,

        frequency:
            4,

        alternativeFrequency:
            3,

        unit:
            "mg/kg/day",

        duration:
            "Indication and severity dependent",

        minimumAgeMonths:
            0,

        configured:
            true

    },

    indicationSpecific:
        false,

    notes:
        "The labeled pediatric range varies with infection severity: serious infections 8-12 mg/kg/day, severe infections 13-16 mg/kg/day, and more severe infections 17-25 mg/kg/day, divided into 3 or 4 doses. Because the new calculator does not select severity, the displayed result represents the stored general range and requires clinical verification. Significant diarrhea requires medical assessment because of the risk of C. difficile-associated disease.",

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
