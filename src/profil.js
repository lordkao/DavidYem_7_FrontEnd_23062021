const btnMultimedia = document.getElementById("btn-multi")
const btnChat = document.getElementById("btn-chat")
const chat = document.getElementById("chat")
const deconnexion = document.getElementById("deconnexion")
const chatWindow = document.getElementById('chat-window')
const access = JSON.parse(localStorage.getItem('access'))
const userId = access.userId
const token = access.token
const profil = document.getElementById('profil')
const urlProfil =`http://localhost:3000/api/auth/${userId}`

/*Déclaration des boutons et du bloc de confirmation de suppression profil*/
/***************************************/
const cadreSupprimer = document.getElementById('cadre-supprimer')
const btnModifier = document.getElementById('btn-modifier')
const btnValider = document.getElementById('btn-valider')
const btnSupprimer = document.getElementById('btn-supprimer')
const btnAnnuler = document.getElementById('btn-annuler')
const supprimer = document.getElementById('del-confirm')
const annuler = document.getElementById('del-cancel')

/*Inputs du formulaire profil*/
/***************************************/
const nom = document.getElementById('nom')
const prenom = document.getElementById('prenom')
const email = document.getElementById('email')
const uploadPhoto = document.getElementById('upload-photo')
const labelPhoto = document.getElementById('label-photo')
const photo = document.getElementById('photo')
const inputs = [nom,prenom,uploadPhoto]

/*Récupération des infos du user connecté*/
function getInfos(){
    fetch(urlProfil,{
        headers:{'Authorization':'Bearer '+token},
    })
    .then((res) => {
        if(res.ok){
            return res.json()
        }
    })
    .then((response) => {
        console.log(response.urlImage)
        nom.value = response.nom
        prenom.value = response.prenom
        email.value = response.email
        if(response.urlImage){
            photo.setAttribute('src',`${response.urlImage}`)
        }
    })
    .catch((err) => console.log(err))
}
getInfos()
/*Redirection au click sur l'un des onglets multimedia ou chat*/
/***************************************/
btnMultimedia.addEventListener("click",function(e){
    e.preventDefault()
    document.location.href="multimedia.html"
})
btnChat.addEventListener("click",function(e){
    e.preventDefault()
    document.location.href="chat.html"
})


function actived(values){
    for(let value of values){
        value.disabled = false
    }
}
function disabled(values){
    for(let value of values){
        value.disabled = true
    }
}
/*Déclaration d'une classe pour gérer l'affichage des boutons*/
class desactivation{
    constructor(bouton1,bouton2,bouton3){
        this.bouton1 = bouton1
        this.bouton2 = bouton2
        this.bouton3 = bouton3
    }
    hide1(){
        labelPhoto.style.display = 'flex'
        this.bouton1.disabled = true
        this.bouton2.disabled = false
        this.bouton3.disabled = false
    }
    hide2(){
        labelPhoto.style.display = 'none'
        this.bouton1.disabled = false
        this.bouton2.disabled = true
        this.bouton3.disabled = true
    }
    hide3(){
        labelPhoto.style.display = 'none'
        this.bouton1.disabled = false
        this.bouton2.disabled = true
        this.bouton3.disabled = true
    }
}
const boutonsProfil = new desactivation(btnModifier,btnAnnuler,btnValider)

btnModifier.addEventListener("click",function(){
    actived(inputs)
    boutonsProfil.hide1()
})
btnAnnuler.addEventListener("click",function(){
    boutonsProfil.hide2()
    getInfos()
    disabled(inputs)
})
btnValider.addEventListener("click",function(e){
    boutonsProfil.hide3()
    e.preventDefault()
    if(!uploadPhoto.value){
        const form = { 
            nom: nom.value,
            prenom: prenom.value,
            userId: userId
        }
        console.log(form)
        fetch(urlProfil,{
            method:"PUT",
            headers:{ 
                "Content-Type":"application/json",
                'Authorization':'Bearer '+token
            },
            body:JSON.stringify(form)
        })
    }
    else{
        let formData = new FormData(profil)
        function test(){
            let array = []
            for(let elt of formData.values()){
            console.log(elt)
            array.push(elt)
            }
            return array
        }
        const essai = test(formData)
        console.log(essai)
        fetch(urlProfil,{
            method:'PUT',
            headers:{
                'Authorization':'Bearer '+token
            },
            body:formData
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            }
        })
        .then((response) => {
            console.log(response)
            getInfos()
        })
        .catch((err) => console.log(err))
    }
    disabled(inputs)
})
btnSupprimer.addEventListener("click",function(){
    btnSupprimer.disabled = true
    cadreSupprimer.style.display = 'block'
    annuler.addEventListener("click",function(){
        cadreSupprimer.style.display = 'none'
        btnSupprimer.disabled = false
    })
    supprimer.addEventListener("click",function(){
        localStorage.clear()
        document.location.href="index.html"
    })
})
deconnexion.addEventListener("click",function(e){
    e.preventDefault()
    localStorage.clear()
    document.location.href="index.html"
})