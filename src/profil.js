const btnMultimedia = document.getElementById("btn-multi")
const btnChat = document.getElementById("btn-chat")
const chat = document.getElementById("chat")
const deconnexion = document.getElementById("deconnexion")
const chatWindow = document.getElementById('chat-window')
const access = JSON.parse(localStorage.getItem('access'))
const userId = access.userId
const token = access.token

btnMultimedia.addEventListener("click",function(e){
    e.preventDefault()
    document.location.href="multimedia.html"
})
btnChat.addEventListener("click",function(e){
    e.preventDefault()
    document.location.href="chat.html"
})
const urlChat ='http://localhost:3000/api/profil'

const cadreSupprimer = document.getElementById('cadre-supprimer')
const btnModifier = document.getElementById('btn-modifier')
const btnValider = document.getElementById('btn-valider')
const btnSupprimer = document.getElementById('btn-supprimer')
const btnAnnuler = document.getElementById('btn-annuler')
const supprimer = document.getElementById('del-confirm')
const annuler = document.getElementById('del-cancel')
const nom = document.getElementById('nom')
const prenom = document.getElementById('prenom')
const email = document.getElementById('email')
const uploadPhoto = document.getElementById('upload-photo')
const inputs = [nom,prenom,email,uploadPhoto]

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

btnModifier.addEventListener("click",function(){
    actived(inputs)
    btnModifier.disabled = true    
    btnAnnuler.disabled = false
    btnValider.disabled =false
})
btnAnnuler.addEventListener("click",function(){
    btnModifier.disabled = false
    btnAnnuler.disabled = true
    btnValider.disabled = true
    disabled(inputs)
})
btnValider.addEventListener("click",function(){
    btnModifier.disabled = false
    btnAnnuler.disabled = true
    btnValider.disabled = true
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