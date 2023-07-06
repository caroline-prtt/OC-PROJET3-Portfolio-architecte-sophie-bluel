// 1_ ON RÉCUPÈRE LA BALISE FORM

const formLogIn = document.getElementById("formLogIn");

// 2_ GESTION DE L'ÉVÈNMENT "SUBMIT" DU FORMULAIRE LOGIN
// A SAVOIR > CONNEXION OU NON DE L'UTILISATEUR AVEC REQUETE API

/* Fonction anonyme déclarée comme "async" car contient du code faisant appel
 à une fonction fetch utilisant le mot clé "await" (permet d'attendre la 
résolution de la promesse renvoyée par fetch avant de continuer exécution code) */

formLogIn.addEventListener("submit", async function (event) {

    // On commence par supprimer le comportement par défaut (raffraichit la page)
    event.preventDefault();
    
    // Récupère les valeurs inscrites par l'utilisateur dans le formulaire:
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

        // console.log(email);
        // console.log(password);

    // Création de la charge utile de la requête :
    const users = {
        "email": email,
        "password": password
    };

        // console.log(users);

    // REQUETE A L'API : connexion ou non de l'utilisateur

    try{
        
        const response = await fetch ("http://localhost:5678/api/users/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(users)
        } )
            // console.log(response);

        // extraction de "response" au format JSON
        const usersLogin = await response.json();
         
         /* "".ok" : est l'une des propriétés de l'objet "response" générée 
        par la promesse renvoyée par la fonction fetch (visible avec console.log(response))
        et "ok: true" si email et password corrects, sinon est "false" */
        if (response.ok === true){

            // on stock le token renvoyé par requête (format réponse.json vu dans Swagger)
            const token = usersLogin.token;
            // puis on le stock dans le sessionStorage (supprimé après fermeture navigateur)
            // setItem("clé", valeur)
            sessionStorage.setItem("token", token);
            // redirection vers la page d'accueil
            window.location.href = "index.html";
        }

        // Gestion des erreurs de connexion 

        else {
            
            // Récupère div du formulaire qui a class ".errorLogIn" dans laquelle 
            // on fera apparaitre le message d'erreur
            let divErrorMessage = document.querySelector(".errorLogIn");
            
            // Modification de la class de la div
            // Nouvelle class
            divErrorMessage.classList.add("errorLogInMessage");
            // Suppression ancienne class
            divErrorMessage.classList.remove("errorLogIn");
            // Insertion balise HTML
            divErrorMessage.innerHTML = "<p>Erreur dans l’identifiant ou le mot de passe</p>";

            // Puis propriétés css intégrées dans styles.css pour la div avec nouvelle class=errorLogInMessage
        }

    }

    // Gestion des erreurs de REQUETE avec "catch"
    catch{
        console.log("erreur dans la requête API")
    }
          
});        

// 3_ RÉCUPÈRE LE TOKEN
// Par le biais de Session Storage, à l'extérieur de la async function (event).
const token = sessionStorage.getItem("token");
