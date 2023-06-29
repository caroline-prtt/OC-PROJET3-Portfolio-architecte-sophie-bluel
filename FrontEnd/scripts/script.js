// ***********************************
// RÉCUPÉRATION DES PROJETS VIA L'API
// ***********************************

// On définit la fonction asynchrone gallery : créée pour générer les projets
// grâce à la requête GET/works à l'API

async function gallery() {

    // Récupérer des donneés de l'API : requête GET/works
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    
    // Création de la boucle pour créer chaque fiche projet

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

// Puis appel de la fonction Portfolio pour générer le code qu'elle contient
gallery();

