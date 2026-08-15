/* =========================================
   DoseCare
   Favorites Logic
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const favoritesContainer =
    document.getElementById(
        "favorites-container"
    );


const emptyFavorites =
    document.getElementById(
        "empty-favorites"
    );


const backHome =
    document.getElementById(
        "back-home"
    );


const browseMedicines =
    document.getElementById(
        "browse-medicines"
    );


/* =========================================
   GET FAVORITES
========================================= */

function getFavorites() {

    const savedFavorites =
        localStorage.getItem(
            "dosecareFavorites"
        );


    if (!savedFavorites) {

        return [];

    }


    try {

        return JSON.parse(
            savedFavorites
        );

    } catch (error) {

        console.error(
            "Unable to load favorites:",
            error
        );

        return [];

    }

}


/* =========================================
   DISPLAY FAVORITES
========================================= */

function displayFavorites() {

    const favorites =
        getFavorites();


    favoritesContainer.innerHTML = "";


    if (favorites.length === 0) {

        emptyFavorites.style.display =
            "flex";

        return;

    }


    emptyFavorites.style.display =
        "none";


    favorites.forEach(
        (medicine) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "favorite-card";


            card.innerHTML = `

                <div class="favorite-medicine-icon">
                    💊
                </div>

                <div class="favorite-medicine-info">

                    <h3>
                        ${medicine.name || "Medicine"}
                    </h3>

                    <p>
                        ${medicine.class || "Medicine"}
                    </p>

                </div>

                <button
                    class="remove-favorite"
                    type="button"
                    data-name="${medicine.name}"
                    aria-label="Remove from favorites"
                >
                    ★
                </button>

            `;


            favoritesContainer.appendChild(
                card
            );

        }
    );


    addRemoveEvents();

}


/* =========================================
   REMOVE FAVORITE
========================================= */

function addRemoveEvents() {

    const removeButtons =
        document.querySelectorAll(
            ".remove-favorite"
        );


    removeButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const medicineName =
                        button.dataset.name;


                    removeFavorite(
                        medicineName
                    );

                }
            );

        }
    );

}


/* =========================================
   REMOVE MEDICINE
========================================= */

function removeFavorite(
    medicineName
) {

    let favorites =
        getFavorites();


    favorites =
        favorites.filter(
            (medicine) =>
                medicine.name !== medicineName
        );


    localStorage.setItem(
        "dosecareFavorites",
        JSON.stringify(favorites)
    );


    displayFavorites();

}


/* =========================================
   BACK TO HOME
========================================= */

if (backHome) {

    backHome.addEventListener(
        "click",
        () => {

            window.location.href =
                "index.html";

        }
    );

}


/* =========================================
   BROWSE MEDICINES
========================================= */

if (browseMedicines) {

    browseMedicines.addEventListener(
        "click",
        () => {

            window.location.href =
                "medicines.html";

        }
    );

}


/* =========================================
   INITIALIZE
========================================= */

displayFavorites();
