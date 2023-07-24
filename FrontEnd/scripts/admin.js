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


// ******************************
// EXÉCUTION DES FENETRES MODALES
// ******************************

// GÉNÉRAL
// -------

// lien "modifier" ouvrant modale 1
const linkOpenModal1 = document.querySelector(".js-open-modal1");

// lien "ajouter photo" ouvrant modale 2
const linkOpenModal2 = document.querySelector(".js-open-modal2");

// lien icone "flèche retour" ouvrant la modale 1
const linkReturnModal1 = document.querySelector(".js-return-modal1");

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
        modal2.style.display = "none";
    } else {
        modal1.style.display = "none";
        modal2.style.display = null;
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

// Stocke une liste : tous les éléments du DOM ayant la class indiquée
const buttonCloseModal = document.querySelectorAll(".fa-xmark");
console.log(buttonCloseModal);

function closeModal(event){
    event.preventDefault();
    modal1.style.display = "none";
    modal2.style.display = "none";
}

//méthode forEach permet d'itérer chaque élément de la liste et d'exécuter une fonction
buttonCloseModal.forEach(function (icon) { 
    icon.addEventListener("click", function (event) {
      closeModal(event);
    });
});



/* 
    2 - FERMETURE MODALE : gérer fermeture de la modale au clic sur le bouton croix ou
    lorsqu'on clique à coté de la modale

    3 - APPARITION PROJETS : photos des projets avec pour chacun
        _ une icone corbeille permettant de supprimer le projet (chaque bouton
            doit avoir son propre id pour reconnaitre le projet supprimée)
        _ un bouton éditer

    4 - Le bouton ajouter un projet pour passer à la modale 2 (AJOUTER LIEN & ANCRE)

    5 - AJOUT DE PROJET : modale ajout de projet : 
        _ apparition de la miniature de la photo sélectionnée
        _ modification du bouton "valider" lorsque tous les champs
        du formulaire sont renseigner : bloquer l'envoi sinon et changement
        de la couleur
*/