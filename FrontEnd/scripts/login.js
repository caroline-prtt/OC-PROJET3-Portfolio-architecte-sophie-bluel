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

1_ création du formulaire LogIn HTML

2_ ajouter l'eventListener sur l'événement "submit" de la balise form 
    > penser a supprimer le comportement par défaut de submit

3_ Créer la charge utile de la requête : 
    const users = {
        "email":   ,
        "passeword"
    }

4_ Convertir l'objet au format JSON avec JSON.strigify();

5_ Faire la requête à l'API

async function LogIn() {

    par exemple fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{
  "email": "string",
  "password": "string"
}'
});

   créer condition :
    if (email==="sophie@"" && password ==="") {
        - renvoi page accueil administrateur)
    }
    else (mauvais emailet/ou/password) {
        - message d'erreur
    }
    
    
voir question localStorage et token

    */
