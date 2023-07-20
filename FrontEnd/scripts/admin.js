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
