let connect = document.getElementById("connect")
let signup = document.getElementById("signup")
let connexion = document.getElementById("connexion")
let inscription = document.getElementById("inscription")

const urlUsersConnect ='http://localhost:3000/api/auth/login'
const urlUsersSignup ='http://localhost:3000/api/auth/signup'


connect.addEventListener("click",function(e){
    e.preventDefault()
    if(connexion.style.display == "block"){
        connexion.style.display = "none"
    }
    else{
        connexion.style.display = "block"
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

function forum(){
    document.location.href="forum.html"
}
/*Validation du formulaire via le bouton valider */

btnValidationConnexion.addEventListener("click",function(e){
    e.preventDefault
    
})

/*Validation du formulaire via le bouton Inscription */
const nom = document.getElementById('nom')
const prenom = document.getElementById('prenom')
const emailSignup = document.getElementById('email-inscription')
const passwordSignup = document.getElementById('password-inscription')

btnValidationCreation.addEventListener("click",function(e){
    let form = { 
        nom: nom.value,
        prenom: prenom.value,
        email: emailSignup.value,
        password : passwordSignup.value,
    }
    /*console.log(form)*/
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
        console.log(response)
        if(response.token == ''){
            console.log('erreur')
        }
        else if(response.token){
            forum()
        }
    })
    .catch(function(err){
        alert(err)
    })
})
