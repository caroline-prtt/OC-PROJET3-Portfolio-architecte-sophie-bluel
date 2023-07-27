// FONCTION REQUETE API : récupération des travaux et conversion JSON
// *********************

async function getData(){
    const reponse = await fetch("http://localhost:5678/api/works");
    const data = reponse.json();
    return data;
}


// FONCTION POUR L'AFFICHAGE DES TRAVAUX SUR LA PAGE
// *************************************************

function displayWorks (works){

    for (let i = 0; i < works.length; i++) {

        // récupère l'élément du DOM qui accueillera les travaux
        const divGallery = document.querySelector(".gallery");

        // On créé la balise dédié à une fiche travaux
        const workElement = document.createElement("figure");
        // On créé un id spécifique pour chaque balise figure (pour gérer suppression de l'élément)
        workElement.setAttribute("id", "accueil-projet"+works[i].id);
        // On créé la balise image des travaux
        const imageElement = document.createElement("img");
        // On accède à l'indice i de la liste de travaux pour configurer la source de l'image
        imageElement.src = works[i].imageUrl;
        // on créé la balise figcaption pour le titre des travaux
        const titreElement = document.createElement("figcaption");
        // On accède à l'indice i de la liste travaux pour configurer le titre
        titreElement.textContent = works[i].title;

        // On rattache tous les éléments à leur élément parent
        divGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(titreElement);
    }
}


// FONCTION GÉNÉRALE DE FILTRAGE DES TRAVAUX SELON CATEGORIE
// *********************************************************

function filteringWorks(buttonSelector, numcategoryId) {

    // selectionne l'élément du DOM
    const filterButton = document.querySelector(buttonSelector);

    // Géstion de l'événement lors du click sur bouton filtre
    filterButton.addEventListener("click", async function () {
        const works = await getData();
        // constante ne retourtant que les travaux avec le numCatégoryID correspondant
        const filteredWorks = works.filter(function (work) {
            return work.categoryId === numcategoryId;
        });
        // Permet d'effacer les travaux précédemment affichés
        document.querySelector(".gallery").innerHTML = "";
        // Puis on affiche uniquement les travaux filtrés
        displayWorks(filteredWorks);
    });
}


// FONCTION POUR GÉNÉRER LES TRAVAUX PAR DÉFAUT ET LES TRAVAUX FILTRÉS
// *******************************************************************

// 1 - Déclaration de la fonction

async function portfolio() {

    // Stocke les datas
    const works = await getData();

    // Par défaut, affiche initialement l'ensemble des travaux
    displayWorks(works);

    // Filtrage des travaux lors du "click" pour chaque filtre
    filteringWorks("#filter-objets", 1); // Filtre objets
    filteringWorks("#filter-appartements", 2); // Filtre appartements
    filteringWorks("#filter-hotels", 3); // Filtre hotels & restaurants

    // Filtre tous
    const filterTous = document.querySelector("#filter-tous");
    filterTous.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      displayWorks(works); // Afficher tous les travaux lorsque "Tous" est cliqué
    });
}

// 2- Appel de la fonction

portfolio();