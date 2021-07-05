let connect = document.getElementById("connect")
let signup = document.getElementById("signup")
let connexion = document.getElementById("connexion")
let inscription = document.getElementById("inscription")

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
btnValidationConnexion.addEventListener("click",function(e){
    e.preventDefault()
    if(emailConnect.value == '' || null || undefined){
        alert('il manque l\'email !')
    }
    else if((/^([\w.-]+)[@]{1}([\w]+)[.]{1}([a-z]){2,5}$/.test(emailConnect.value))===false){
        console.log({ message:'Veuillez renseigner un email valide.(ex: jean@hotmail.com'})
        alert('Veuillez renseigner un email valide.(ex: jean@hotmail.com')
    }
    else if(passwordConnect.value == '' || null || undefined){
        alert('il manque le mot de passe !')
    }
    else if(/([^a-zA-Z0-9@]+)/.test(passwordConnect.value)){
        console.log({ message:'Veuillez renseigner un password valide.(les caractères spéciaux ne sont pas autorisés)'})
        alert('Veuillez renseigner un password valide.(les caractères spéciaux ne sont pas autorisés)')
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

/*Validation du formulaire via le bouton Inscription en vérifiant avec les regexs*/
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
    else if((/[a-zA-Zéèçà][-]{1,}$/.test(nom.value))||(/[^a-zA-Zéèçà-]/.test(nom.value))){
        console.log("Veuillez renseigner votre nom seulement avec des lettres.(ex: David)")
        alert("Veuillez renseigner votre nom seulement avec des lettres.(ex: David)")
    }
    else if(prenom.value == '' || null || undefined){
        alert('il manque le prenom')
    }
    else if((/[a-zA-Zéèçà][-]{1,}$/.test(prenom.value))||(/[^a-zA-Zéèçà-]/.test(prenom.value))){
        console.log("Veuillez renseigner votre prénom seulement avec des lettres.(ex: David)")
        alert("Veuillez renseigner votre prénom seulement avec des lettres.(ex: David)")
    }
    else if(emailSignup.value == '' || null || undefined){
        alert('il manque l\'adresse email')
    }
    else if((/^([\w.-]+)[@]{1}([\w]+)[.]{1}([a-z]){2,5}$/.test(emailSignup.value))===false){
        console.log({ message:'Veuillez renseigner un email valide.(ex: jean@hotmail.com'})
        alert('Veuillez renseigner un email valide.(ex: jean@hotmail.com')
    }
    else if(passwordSignup.value == '' || null || undefined){
        alert('il manque le password')
    }
    else if(/([^a-zA-Z0-9@]+)/.test(passwordSignup.value)){
        console.log({ message:'Veuillez renseigner un password valide.(les caractères spéciaux ne sont pas autorisés)'})
        alert('Veuillez renseigner un password valide.(les caractères spéciaux ne sont pas autorisés)')
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
