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
btnValidationConnexion.addEventListener("click",function(e){
    e.preventDefault()
    let form = {
        email : emailConnect.value,
        password : passwordConnect.value
    }  
    if(emailConnect.value == '' || null || undefined){
        alert('il manque l\'email !')
    }
    else if(passwordConnect.value == '' || null || undefined){
        alert('il manque le mot de passe !')
    }
    else{
        /*console.log(form)*/
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
                console.log({ error : 'Identifiants incorrect !'})
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

/*Validation du formulaire via le bouton Inscription */
/*************************************************/
btnValidationCreation.addEventListener("click",function(e){
    e.preventDefault()
    let form = { 
        nom: nom.value,
        prenom: prenom.value,
        email: emailSignup.value,
        password : passwordSignup.value,
    }
    if(nom.value == '' || null || undefined){
        alert('il manque le nom')
    }
    else if(prenom.value == '' || null || undefined){
        alert('il manque le prenom')
    }
    else if(emailSignup.value == '' || null || undefined){
        alert('il manque l\'adresse email')
    }
    else if(passwordSignup.value == '' || null || undefined){
        alert('il manque le password')
    }
    else{
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
                    console.log({ error : 'Adresse mail déjà utilisée'})
                }
        })
        .catch(function(err){
            alert(err)
        })
    }
    
})
