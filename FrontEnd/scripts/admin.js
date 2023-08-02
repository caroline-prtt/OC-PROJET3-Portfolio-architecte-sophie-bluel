// ******************************************************
// APRÈS CONNEXION AU COMPTE ADMINISTRATEUR,
// RÉCUPÉRATION DU TOKEN PAR LE BIAIS DE SESSION STORAGE 
// ******************************************************

const token = sessionStorage.getItem("token");

console.log(token);

//**************************************** */
// MODIFICATION DESIGN PAGE ADMINISTRATEUR
//**************************************** */

function modifyClassElementDOM (selectorCSS, newclass, removedclass){
    let selectionElement = document.querySelector(selectorCSS);
    selectionElement.classList.add(newclass);
    selectionElement.classList.remove(removedclass);
};

if(token !== null){

    console.log("Connecté !");

    // Modification class barre édition > pour apparition
    modifyClassElementDOM(".hidden-bar-edit", "bar-edit", "hidden-bar-edit");
    
    // Modification class bouton "modifer" de introduction > pour apparition
    modifyClassElementDOM(".hidden-edit-button-intro", "edit-button-intro", "hidden-edit-button-intro");

    // Modification class bouton "modifier" des projets > pour apparition
    modifyClassElementDOM(".hidden-edit-button-projets", "edit-button-projets", "hidden-edit-button-projets");

    // Disparition des boutons filtres
    modifyClassElementDOM(".filters", "hidden-filters", "filters");

} else {
    console.log("Pas connecté");
}


// ***************************************
// *** EXÉCUTION DES FENETRES MODALES ***
// ***************************************

// GÉNÉRAL
// -------

// lien "modifier" ouvrant modale 1
const linkOpenModal1 = document.querySelector(".js-open-modal1");

// lien "ajouter photo" ouvrant modale 2
const linkOpenModal2 = document.querySelector(".js-open-modal2");

// lien icone "flèche retour" ouvrant la modale 1
const linkReturnModal1 = document.querySelector(".js-return-modal1");

// toutes les modales 
const modals = document.querySelectorAll(".modal");

// le conteneur modale 1 <aside>
const modal1 = document.getElementById("modal1");

// le conteneur modale 1 <aside>
const modal2 = document.getElementById("modal2");


// OUVERTURE DES MODALES
// ---------------------

function openModal(event, target){
    event.preventDefault();
    if (target === modal1){
        modal1.style.display = null;
        modal1.setAttribute("aria-hidden", "false");
        modal2.style.display = "none";
        resetForm(); // Réinitialise formulaire modale 2 lorsqu'on revient sur modale 1
    } else {
        modal1.style.display = "none";
        modal2.style.display = null;
        modal2.setAttribute("aria-hidden", "false");
    }
};

linkOpenModal1.addEventListener("click", function (event){
    openModal(event, modal1);
})

linkOpenModal2.addEventListener("click", function(event){
    openModal(event, modal2);
})

linkReturnModal1.addEventListener("click", function(event){
    openModal(event, modal1);
})


// FERMETURE DES MODALES
// ---------------------

// Stocke la liste de toutes les icones "croix" permettant de fermer la modale
const buttonCloseModal = document.querySelectorAll(".fa-xmark");

// Déclaration de la fonction fermeture modale 
function closeModal(event){
    event.preventDefault();
    modal1.style.display = "none";
    modal1.setAttribute("aria-hidden", "true");
    modal2.style.display = "none";
    modal2.setAttribute("aria-hidden", "true")

    resetForm(); // Réinitialise formulaire modale 2 lorsqu'on ferme la modale 2
}

// Pour chaque icone (i) exécute un Listener : au clic > appelle closeModal
buttonCloseModal.forEach(function (i) { 
    i.addEventListener("click", function (event) {
      closeModal(event);
    });
});

/* On ajoute la possibilité de fermer la modale lorsqu'un clic 
est effectué en dehors de la div "modal-wrapper*/

//Constante permettant de stoper la propagation du clic à l'élément parent
const stopPropagation = function(event){
    event.stopPropagation();
}

// POUR MODALE 1 : 

// par défaut lors du click sur la modal(générale) : fermerture de la modale
modal1.addEventListener("click", function(event){
    closeModal(event);
})
/* on sélectionne la div et on lui applique un stop propagation > limite donc
l'application de la méthode précédente*/
modal1.querySelector(".modal-stop-propagation").addEventListener("click", function(event){
   stopPropagation(event);
})

// POUR MODALE 2 : 

modal2.addEventListener("click", function(event){
    closeModal(event);
})

modal2.querySelector(".modal-stop-propagation").addEventListener("click", function(event){
   stopPropagation(event);
})


// APPARITION DES MINIATURES DES PROJETS DANS MODALE 1
// --------------------------------------------------

// récupère l'élément du DOM qui accueillera les travaux
const divModalPictures = document.querySelector(".modal-wrapper-photos");

// On déclare la fonction qui créé les miniatures 

function displayModalPictures (works){

    console.log(works);

    for (let i = 0; i < works.length; i++) {

        // On créé la balise dédié à une fiche travaux
        const workElement = document.createElement("figure");
        // On créé un id spécifique pour chaque balise figure (pour gérer suppression de l'élément)
        workElement.setAttribute("id", "modal-photo"+works[i].id);
        // On créé la balise image des travaux
        const imageElement = document.createElement("img");
        // On accède à l'indice i de la liste de travaux pour configurer la source de l'image et le texte alternatif
        imageElement.src = works[i].imageUrl;
        imageElement.alt = works[i].title;
        //ajout des icones poubelle pour suppression projets
        const buttonDelete = document.createElement("i");
        buttonDelete.classList.add("fa-solid", "fa-trash-can");
        //on attribut à chaque icone un attribut "data-id" ayant l'id du projet correspondant
        buttonDelete.dataset.id = works[i].id;
        // on créé la mention "editer" sous la photo
        const editElement = document.createElement("p");
        editElement.textContent = "éditer"
        editElement.getAttribute("class", "editPhoto")

        // On rattache tous les éléments à leur élément parent
        divModalPictures.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(buttonDelete);
        workElement.appendChild(editElement);

    }
}

// On déclare la fonction qui créé l'EventListener sur les boutons Delete

function ListenerButtonDelete(){

    // On récupère tous les boutonsDelete 
    const allButtonsDelete = document.querySelectorAll(".fa-trash-can");

    allButtonsDelete.forEach(function(buttonDelete){
        //On stocke l'id du bouton
        const buttonDeleteId = buttonDelete.dataset.id;
        //On créé l'EventListener pour chaque bouton > appelle la fonction deleteWork
        buttonDelete.addEventListener("click", function(){
            console.log("Clic sur corbeille n°" + buttonDeleteId);
            //Appel de la fonction deleteWork 
            //l'id du bouton en paramètre = id du projet à supprimer
            deleteWork(buttonDeleteId) 
        })
    })
}

async function modalPictures(){
    // Stocke les datas de la fonction fetch GET/WORKS (issue de script.js)
    const works = await getData();

    //Et on affiche l'ensemble des travaux
    displayModalPictures(works);

    //On ajoute l'EventListener au click sur le bouton Delete
    ListenerButtonDelete();
}

modalPictures();


// SUPPRESSION D'UN PROJET 
// ------------------------

//buttonDeletID = id du projet affilié

async function deleteWork(id){
    
    try{

        // On stocke l'élément de la MODALE "Figure" du DOM qui sera à supprimer
        const photoModalToDelete = document.querySelector("#modal-photo"+id);
        const projetAccueilToDelete = document.querySelector("#accueil-projet"+id);

        // On fait la requête DELETE à l'API et on stocke la réponse

        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + token 
            }
        });

        //Puis après la suppression sur le serveur, on supprime l'élément du DOM

        if (response.ok === true){

            console.log("La requête a bien été envoyée, je supprime alors du DOM le projet n° " + id + photoModalToDelete)

            const works = await getData();
            
            console.log(works);
        
            //Suppression des photos dans modale et page d'accueil
            photoModalToDelete.remove();
            projetAccueilToDelete.remove();

        } 

        else {
            console.log("Erreur lors de la suppression du projet")
        }

    }

    catch{
        console.log("Erreur de la requête DELETE à l'API");
    }    
    
}


// AJOUT D'UN PROJET 
// ------------------

    // AFFICHAGE MINIATURE PHOTO A AJOUTER
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

// On stocke la Div Selection de fichier
const selectPhotoDiv = document.getElementById("select-photo");

// On stocke la div qui contiendra la miniature 
const previewPhotoDiv = document.getElementById("preview-photo");

// On stocke l'input selection fichier
const fileInput = document.getElementById("file-upload");

// On ajoute un EventListener CHANGE à cet input (>écoute le changement de valeur)

fileInput.addEventListener("change", function (){
    
    /* on stocke le fichier sélectionné (OBJET): on accède à la propriété files de l'input
    et on sélectionne le premier élément du tableau (= premier élément sélectionné) */
    const fileSelected = fileInput.files[0];
    console.log(fileSelected); //renvoi l'objet file (nom, dernière modif, format...)

    if (fileSelected != null){

        /* On créé une nouvelle instance de l'objet FileReader
        FileReader est une API JS qui permet de lire le contenu des fichiers (type file)*/
        const reader = new FileReader();

        /* onload = gestionnaire d'événement : lorsqu'une opération de lecture est menée à bien lance fonction event
        -> la fonction est exécutée lorsque le contenu du fichier est chargée avec succès */
        reader.onload = function (event){
            
            // stocke l'URL de l'image dans propriété result de l'objet event.target
            const imageURL = event.target.result;

            // cache la div "selectPhoto"
            selectPhotoDiv.style.display = "none";

            // On fait apparaitre dans la div "preview" la miniature en insérant innerHTML img
            previewPhotoDiv.innerHTML = `<img src="${imageURL}" alt="Miniature image à ajouter">`;
        } 

        /*Puis on lance lecture du fichier en utilisant FileReader et la méthode readAsDataURL(file) 
        pour lire le contenu du fichier sous la forme d'une URL de données*/
        reader.readAsDataURL(fileSelected);
    }

})

    // MODIFICATION DU BOUTON "VALIDER" SI FORMULAIRE COMPLET
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

// Stocke les éléments du DOM
const formAddPhoto = document.querySelector(".form-add-photo");
const titleInput = document.getElementById("title-photo");
const categoryProjet = document.getElementById("category-projet");
const buttonForm = document.getElementById("invalid-button");
const divErrorForm = document.getElementById("error-form");

function validateForm() {

    if (titleInput.value !== "" && fileInput.files.length > 0) {
        console.log("Le formulaire est complet");
        buttonForm.setAttribute("id", "valid-button");
        //Suppression message erreur formulaire incomplet si affiché
        divErrorForm.style.display = "none";

    } else {
        //Formulaire incomplet
        buttonForm.setAttribute("id", "invalid-button");
    }
}

// Ajout des EventListener à chaque modification des champs file et title avec
// Appel de la function validateForm
fileInput.addEventListener("change", validateForm);
titleInput.addEventListener("input", validateForm);


    // ENVOI FORMULAIRE (event SUBMIT) > AJOUT PROJET OU MESSAGE ERREUR
    // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

formAddPhoto.addEventListener("submit", async function (event){

    event.preventDefault();

    // On récupère la catégorie sélectionnée : 
    const categoryOption = categoryProjet.value;
    // Puis on attribue un id particulier à la catégorie : 
    let categoryId ;
    if (categoryOption === "objet"){
        categoryId = 1;
    } else if (categoryOption === "appartement"){
        categoryId = 2;
    } else if (categoryOption === "hotel-restaurant"){
        categoryId = 3;
    }
    
    console.log("nom catégorie sélectionnée : " + categoryOption);
    console.log("catégorie ayant l'id n° " + categoryId)
    
    // Puis on regarde si le formulaire est complet ou non

    if (titleInput.value !== "" && fileInput.files.length > 0) {

        console.log("je publie le nouveau projet");
    
        // Création de l'objet FormData à partir du formulaire HTML
        const newProjetData = new FormData();
            newProjetData.append("image", fileInput.files[0]);
            newProjetData.append("title", titleInput.value);
            newProjetData.append("category", categoryId);

            // console.log("image : " + newProjetData.get("image"));
            // console.log("title : " + newProjetData.get("title"));
            // console.log("category : " + newProjetData.get("category"));

        try{

            const response = await fetch ("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    // Aucun besoin de spécifier le Content-Type, FormData le gère automatiquement
                    "Authorization" : "Bearer " + token
                },
                body: newProjetData
            });

            if (response.ok){
                console.log("Ajout du projet avec succès");
                const NewProjet = await response.json();
            //Renvoie sur la modale 1 automatiquement après clic
                openModal(event, modal1);
            // Puis on regénère l'apparition des miniatures sur la modale 1
                divModalPictures.innerHTML = "";
                modalPictures();
            // Idem pour les projets en page d'accueil :
                divGallery.innerHTML = "";
                portfolio();
            } else {
                console.log("L'ajout du projet a échoué !");
            }
        }

        catch{
            console.log("erreur lors de l'envoi de la requête POST")
        }

    } else {
       console.log("J'ai cliqué sur le bouton mais formulaire incomplet")
       // Affichage message d'erreur formulaire incomplet
       divErrorForm.style.display = "flex";
    }

})

// Ajout d'une fonction reset permettant de réinitialiser le formulaire
// d'ajout de projet à chaque fermeture de la modale 2

function resetForm() {
    fileInput.value = ""; // Réinitialiser le champ de sélection de fichier
    titleInput.value = ""; // Réinitialiser le champ de titre
    categoryProjet.value = "objet"; // Réinitialiser le champ de catégorie
    previewPhotoDiv.innerHTML = ""; // Effacer l'aperçu de la miniature
    selectPhotoDiv.style.display = "flex"; // Réafficher la div pour la sélection de photo
    validateForm(); // Mettre à jour le bouton "Valider" selon l'état du formulaire réinitialisé
}
