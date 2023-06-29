// Fonction async qui englobe tout le code qui dépend de la requête GET/works de l'API

async function gallery() {

    // REQUETE API : GET/WORKS
    // ***********************

    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    
    // FONCTION COMPRENANT LA BOUCLE QUI GÉNÈRE LES PROJETS
    // *********************************************************

    function genereWorks (works){

        for (let i = 0; i < works.length; i++) {

            // récupère l'élément du DOM qui accueillera les travaux
            const divGallery = document.querySelector(".gallery");

            // On créé la balise dédié à une fiche travaux
            const workElement = document.createElement("figure");
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

    genereWorks(works);  // appel de la fonction genereWorks pour exécuter son contenu

    // RÉALISATION DES FILTRES D'AFFICHAGE
    // ***********************************

    // Filtre objets

    const filterObjets = document.querySelector("#filter-objets");
    filterObjets.addEventListener("click", function() {
        const worksObjets = works.filter(function(work){
            return work.categoryId == 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        genereWorks(worksObjets);
    });

    // Filtre appartements

    const filterAppartements = document.querySelector("#filter-appartements");
    filterAppartements.addEventListener("click", function() {
        const worksAppartements = works.filter(function(work){
            return work.categoryId == 2;
        });
        document.querySelector(".gallery").innerHTML = "";
        genereWorks(worksAppartements);
    });

    // Filtre hotels & restaurants

    const filterHotels = document.querySelector("#filter-hotels");
    filterHotels.addEventListener("click", function() {
        const worksHotels = works.filter(function(work){
            return work.categoryId == 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        genereWorks(worksHotels);
    });

    // Filtre tous

    const filterTous = document.querySelector("#filter-tous");

    filterTous.addEventListener("click",function(){
        const worksTous = works.filter(function(work){
            document.querySelector(".gallery").innerHTML = "";
            genereWorks(works);
        })
    });

}

// Puis appel de la fonction Portfolio pour générer le code qu'elle contient
gallery();

