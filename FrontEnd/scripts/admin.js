// ******************************************************
// APRÈS CONNEXION AU COMPTE ADMINISTRATEUR,
// RÉCUPÉRATION DU TOKEN PAR LE BIAIS DE SESSION STORAGE 
// ******************************************************

const token = sessionStorage.getItem("token");

console.log(token);

// APPARITION DES NOUVEAUX MENUS EDITIONS SUR LA PAGE ACCUEIL

// selectionner la div

if(token !== null){
    console.log("Connecté !");
    let menuEdition = document.querySelector(".wait-connexion");
    menuEdition.classList.add("administrateur")
    menuEdition.classList.remove("wait-connexion")
} else {
    console.log("Pas connecté");
};