let connect = document.getElementById("connect")
let signup = document.getElementById("signup")
let connexion = document.getElementById("connexion")
let inscription = document.getElementById("inscription")
import {invalidInputText,blocErreur,blocErreur2} from "./functions.js"
const urlUsersConnect ='http://localhost:3000/api/auth/login'
const urlUsersSignup ='http://localhost:3000/api/auth/signup'


connect.addEventListener("click",function(e){
    e.preventDefault()
    if(connexion.style.display == "flex"){
        connexion.style.display = "none"
    }
    else{
        connexion.style.display = "flex"
    }
    inscription.style.display = "none"
})
signup.addEventListener("click",function(e){
    e.preventDefault
    if (inscription.style.display == "block"){
        inscription.style.display = "none"
    }
    else{
        inscription.style.display = "block"
    }
    connexion.style.display = "none"
})

let btnValidationConnexion = document.getElementById("validation-connexion")
let btnValidationCreation = document.getElementById("validation-creation")
/*Redirection vers la page forum.html.*/
/*************************************************/
function forum(){
    document.location.href="multimedia.html"
}
/*Déclaration des inputs de connection.*/
/*************************************************/
let emailConnect = document.getElementById('email-connect')
let passwordConnect = document.getElementById('password-connect')

/*Validation du formulaire via le bouton valider */
/*************************************************/

/*Création des messages d'erreurs à afficher*/
let errorEmailConnexion = invalidInputText('connexion','Veuillez renseigner un email valide.(ex: jean@hotmail.com)')
let errorPasswordConnexion = invalidInputText('connexion','Veuillez renseigner un password valide.(les caractères spéciaux ne sont pas autorisés)')
let nonAutoriseConnexion = invalidInputText("connexion","Identifiants incorrect !")
/*Évènement sur le bouton de validation de login*/
btnValidationConnexion.addEventListener("click",function(e){
    e.preventDefault()
    if(emailConnect.value == '' || null || undefined){
        blocErreur(errorEmailConnexion,errorPasswordConnexion,nonAutoriseConnexion)
    }
    else if((/^([\w.-]+)[@]{1}([\w]+)[.]{1}([a-z]){2,5}$/.test(emailConnect.value))===false){
        blocErreur(errorEmailConnexion,errorPasswordConnexion,nonAutoriseConnexion)
    }
    else if(passwordConnect.value == '' || null || undefined){
        blocErreur(errorPasswordConnexion,errorEmailConnexion,nonAutoriseConnexion)
    }
    else if(/([^a-zA-Z0-9@]+)/.test(passwordConnect.value)){
        blocErreur(errorPasswordConnexion,errorEmailConnexion,nonAutoriseConnexion)
    }
    else{
        let form = {
            email : emailConnect.value,
            password : passwordConnect.value
        } 
        fetch(urlUsersConnect,{
            method: "POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(form)
        })
        .then(function(res){
            if(res.ok){
                return res.json()
            }
        })
        .then(function(response){
            try{
                if(response.userId && response.token){
                   const access = response
                localStorage.setItem('access',JSON.stringify(access))
                forum() 
                }
            }
            catch(error){
                blocErreur(nonAutoriseConnexion,errorEmailConnexion,errorPasswordConnexion)
            }
        })
        .catch(function(err){
            console.log(err)
        })
    }
})

/*Déclaration des inputs de formulaire d'inscription*/
/*************************************************/
const nom = document.getElementById('nom')
const prenom = document.getElementById('prenom')
const emailSignup = document.getElementById('email-inscription')
const passwordSignup = document.getElementById('password-inscription')

/*Création des messages d'erreurs à afficher*/
let errorNomInscription = invalidInputText('inscription','Veuillez renseigner votre nom seulement avec des lettres.(ex: Legrand)')
let errorrPrenomInscription = invalidInputText('inscription','Veuillez renseigner votre prénom seulement avec des lettres.(ex: David)')
let errorEmailInscription = invalidInputText('inscription','Veuillez renseigner un email valide.(ex: jean@hotmail.com)')
let errorPasswordInscription = invalidInputText('inscription','Veuillez renseigner un password valide.(les caractères spéciaux ne sont pas autorisés)')
let nonAutoriseInscription = invalidInputText("inscription","Identifiants incorrect !")

/*Validation du formulaire via le bouton Inscription en vérifiant avec les regexs*/
/*************************************************/
btnValidationCreation.addEventListener("click",function(e){
    e.preventDefault()
    if(nom.value == '' || null || undefined){
        blocErreur2(errorNomInscription,errorPasswordInscription,errorEmailInscription,errorrPrenomInscription,nonAutoriseInscription)
    }
    else if((/[a-zA-Zéèçà][-]{1,}$/.test(nom.value))||(/[^a-zA-Zéèçà-]/.test(nom.value))){
        blocErreur2(errorNomInscription,errorPasswordInscription,errorEmailInscription,errorrPrenomInscription,nonAutoriseInscription)
    }
    else if(prenom.value == '' || null || undefined){
        blocErreur2(errorrPrenomInscription,errorNomInscription,errorPasswordInscription,errorEmailInscription,nonAutoriseInscription)
    }
    else if((/[a-zA-Zéèçà][-]{1,}$/.test(prenom.value))||(/[^a-zA-Zéèçà-]/.test(prenom.value))){
        blocErreur2(errorrPrenomInscription,errorNomInscription,errorPasswordInscription,errorEmailInscription,nonAutoriseInscription)
    }
    else if(emailSignup.value == '' || null || undefined){
        blocErreur2(errorEmailInscription,errorrPrenomInscription,errorNomInscription,errorPasswordInscription,nonAutoriseInscription)
    }
    else if((/^([\w.-]+)[@]{1}([\w]+)[.]{1}([a-z]){2,5}$/.test(emailSignup.value))===false){
        blocErreur2(errorEmailInscription,errorrPrenomInscription,errorNomInscription,errorPasswordInscription,nonAutoriseInscription)
    }
    else if(passwordSignup.value == '' || null || undefined){
        blocErreur2(errorPasswordInscription,errorEmailInscription,errorrPrenomInscription,errorNomInscription,nonAutoriseInscription)
    }
    else if(/([^a-zA-Z0-9@]+)/.test(passwordSignup.value)){
        blocErreur2(errorPasswordInscription,errorEmailInscription,errorrPrenomInscription,errorNomInscription,nonAutoriseInscription)
    }
    else{
        let form = { 
            nom: nom.value,
            prenom: prenom.value,
            email: emailSignup.value,
            password : passwordSignup.value,
        }
        console.log(form)
        fetch(urlUsersSignup,{
            method: "POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(form)
            }
        )
        .then(function(res){
            if(res.ok){
                return res.json()
            }
        })
        .then(function(response){
                try{
                    if(response.userId && response.token){
                        const access = response
                        localStorage.setItem('access',JSON.stringify(access))
                        forum()
                    }
                }
                catch(error){
                    blocErreur2(nonAutoriseInscription,errorPasswordInscription,errorEmailInscription,errorrPrenomInscription,errorNomInscription)
                }
        })
        .catch(function(err){
            alert(err)
        })
    }
})
