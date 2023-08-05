// Stocke la balise form
const formLogIn = document.getElementById("formLogIn");

// GESTION DE L'ÉVÈNMENT "SUBMIT" DU FORMULAIRE LOGIN (CONNEXION OU NON)
// ****************************************************

/* Fonction anonyme "asynchrone" car fait appel à fonction fetch utilisant "await"
(permet d'attendre la résolution de la promesse renvoyée par fetch avant de continuer code) */

formLogIn.addEventListener("submit", async function (event) {

    // On commence par supprimer le comportement par défaut (raffraichit la page)
    event.preventDefault();
    
    // Récupère les valeurs inscrites par l'utilisateur dans le formulaire:
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Création de la charge utile de la requête :
    const users = {
        "email": email,
        "password": password
    };

    // REQUETE A L'API : connexion ou non de l'utilisateur
    try{
        
        const response = await fetch ("http://localhost:5678/api/users/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(users)
        } )

        const usersLogin = await response.json(); // extraction de "response" au format JSON
         
         /* ".ok" : est l'une des propriétés de l'objet "response" générée 
        par la promesse renvoyée par la fonction fetch (visible avec console.log(response))
        et "ok: true" si email et password corrects, sinon est "false" */
        if (response.ok === true){
            // on stocke le token renvoyé par requête (voir Swagger)
            const token = usersLogin.token;
            // puis on le stocke dans le sessionStorage
            // setItem("clé", valeur)
            sessionStorage.setItem("token", token);
            // redirection vers la page d'accueil
            window.location.href = "index.html";
        }

        // Gestion des erreurs de connexion 
        else {
            
            // Stocke <div> dans laquelle on fera apparaitre le message d'erreur
            let divErrorMessage = document.querySelector(".errorLogIn");
            // Nouvelle class
            divErrorMessage.classList.add("errorLogInMessage");
            // Suppression ancienne class
            divErrorMessage.classList.remove("errorLogIn");
            // Insertion balise HTML
            divErrorMessage.innerHTML = "<p>Erreur dans l’identifiant ou le mot de passe</p>";
        }
    }

    catch{
        console.log("erreur dans la requête API")
    }
});        

// ON STOCKE LE TOKEN
// *******************

// Par le biais de Session Storage, à l'extérieur de la async function (event).
const token = sessionStorage.getItem("token");
