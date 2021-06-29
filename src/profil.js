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
const urlChat ='http://localhost:3000/api/chat'
/*Fonction qui affiche tous les messages du chat.*/
function showMessage(){
    fetch(urlChat,{
        headers : {'Authorization':'Bearer '+token}
    })
    .then((res) => {
        if(res.ok){
            return res.json()
        }
    })
    .then((responses) => {
        console.log(responses)
        
        for(let response of responses){
            const containerMessage = document.createElement('div')
                containerMessage.classList.add('container-chat')

            const message = document.createElement('div')
                message.classList.add('container-chat__message')

            const texte = document.createElement('p')
                texte.classList.add('container-chat__message--texte')
                texte.innerText = `${response.message}`
                
            const auteur = document.createElement('div')
                auteur.classList.add('container-chat__auteur')
                auteur.setAttribute('id','auteur')
                auteur.innerText = `(${response.date}) ${response.nom}.${response.prenom} : `    

            chatWindow.appendChild(containerMessage)
            containerMessage.appendChild(message)
            containerMessage.appendChild(auteur)
            message.appendChild(texte)
        }
    })
    .catch((err) => console.log({message:err}))
}
showMessage()
const nouveauMessage = document.getElementById('chat-message')
const validationMessage = document.getElementById('validation-message')
validationMessage.addEventListener("click",function(e){
    e.preventDefault()
    const objetMessage = { 
        message:nouveauMessage.value,
        userId:userId,
        token:token
        }
    console.log(objetMessage)
    fetch(urlChat,{
        method : 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token
        },
        body:JSON.stringify(objetMessage)
    })
    .then((res) => {
        if(res.ok){
            return res.json()
        }
    })
    .then((response) => {
        console.log(response)
    })
    .catch((err) => console.log({message:err}))
})
deconnexion.addEventListener("click",function(e){
    e.preventDefault()
    localStorage.clear()
    document.location.href="index.html"
})