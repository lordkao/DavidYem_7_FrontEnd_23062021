const btnMultimedia = document.getElementById("btn-multi")
const btnChat = document.getElementById("btn-chat")
const btnProfil = document.getElementById("btn-profil")
const multimedia = document.getElementById("multimedia")
const chat = document.getElementById("chat")
const chatWindow = document.getElementById('chat-window')

const borderBlock = ()=>{
    btnMultimedia.style.borderBottom = "1px grey solid"
    btnChat.style.borderBottom = "1px grey solid"
    btnProfil.style.borderBottom = "1px grey solid"
}
const eventBtn = (e,value1,value2,value3)=>{
    e.preventDefault()
    borderBlock()
    value1.style.borderBottom = "transparent"
    value2.style.display = "block"
    value3.style.display = "none"
}
btnMultimedia.addEventListener("click",function(e){
    e.preventDefault()
    borderBlock()
    btnMultimedia.style.borderBottom = "transparent"
    multimedia.style.display = "block"
    chat.style.display = "none"
})
btnChat.addEventListener("click",function(e){
    e.preventDefault()
    borderBlock()
    btnChat.style.borderBottom = "transparent"
    chat.style.display = "block"
    multimedia.style.display = "none"
})
btnProfil.addEventListener("click",function(e){
    e.preventDefault()
    borderBlock()
    btnProfil.style.borderBottom = "transparent"
})

const url ='http://localhost:3000/chat'

function showMessage(){
    fetch(url)
    .then(function(res){
        if(res.ok){
            return res.json()
        }
    })
    .then(function(responses){
        console.log(responses)
        
        for(let response of responses){
            const message = document.createElement('div')
                message.classList.add('message')

            const auteur = document.createElement('div')
                auteur.classList.add('message__auteur')
                auteur.setAttribute('id','auteur')
                auteur.innerText = `(${response.dateTime}) ${response.auteur} : `

            const texte = document.createElement('p')
                texte.classList.add('message__texte')
                texte.innerText = `${response.message}`

            chatWindow.appendChild(message)
            message.appendChild(auteur)
            message.appendChild(texte)
        }
    })
    .catch(function(error){
        console.log({ message: error})
    })
}

showMessage()
