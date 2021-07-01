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

deconnexion.addEventListener("click",function(e){
    e.preventDefault()
    localStorage.clear()
    document.location.href="index.html"
})