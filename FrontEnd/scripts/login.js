
// On récupère la balise form

let formLogIn = document.getElementById("formLogIn");

// On gère l'évènement submit du formulaire LogIn

formLogIn.addEventListener("submit", (event) => {
    // On commence par supprimer le comportement par défaut (raffraichit la page)
    event.preventDefault();
    // Récupère les valeurs inscrites dans le formulaire Login:
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    console.log(email);
    console.log(password);
})




/* 


async{
    
    1- faire requete fetch: post/User
        method
        body
        headers
   
    2- créer condition :
    if (email==="sophie@"" && password ==="") {
        - renvoi page accueil administrateur)
    }
    else (mauvais emailet/ou/password) {
        - message d'erreur
    }
    
    
voir question localStorage

    */
