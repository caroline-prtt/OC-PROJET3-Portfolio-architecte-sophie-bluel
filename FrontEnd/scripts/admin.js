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

// On déclare la fonction qui créé les miniatures 

function displayModalPictures (works){

    console.log(works);

    for (let i = 0; i < works.length; i++) {

        // récupère l'élément du DOM qui accueillera les travaux
        const divModalPictures = document.querySelector(".modal-wrapper-photos");

        // On créé la balise dédié à une fiche travaux
        const workElement = document.createElement("figure");
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
            console.log("Je supprime le projet numéro " + buttonDeleteId);
            //deleteWork(buttonDeleteId)
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


async function deleteWork (id){
    
    try{

    }
    catch{
        console.
    }

    
    
    // Rafraichir automatiquement la page
}



/* 
    
    5 - AJOUT DE PROJET : modale ajout de projet : 
        _ apparition de la miniature de la photo sélectionnée
        _ modification du bouton "valider" lorsque tous les champs
        du formulaire sont renseigner : bloquer l'envoi sinon et changement
        de la couleur
*/