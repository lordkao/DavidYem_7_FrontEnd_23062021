const btnMultimedia = document.getElementById("btn-multi")
const btnChat = document.getElementById("btn-chat")
const btnProfil = document.getElementById("btn-profil")
const multimedia = document.getElementById("multimedia")
const chat = document.getElementById("chat")
const chatWindow = document.getElementById('chat-window')
const publicationWindow = document.getElementById('publication')
const access = JSON.parse(localStorage.getItem('access'))
const userId = access.userId
const token = access.token

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

const urlChat ='http://localhost:3000/api/chat'
const urlPublications ='http://localhost:3000/api/publications'

function showMessage(){
    fetch(urlChat,{
        headers : {'Authorization':'Bearer '+token}
    })
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
                auteur.innerText = `(${response.date}) ${response.nom}.${response.prenom} : `

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

function showPublications(){
    fetch(urlPublications,{
        headers : {'Authorization':'Bearer '+token}
    })
    .then(function(res){
        if(res.ok){
            return res.json()
        }
    })
    .then(function(responses){
        console.log('publication :')
        console.log(responses)

        for(let response of responses){
            const container = document.createElement('div')
                container.classList.add('container')

            const auteur = document.createElement('h3')
                auteur.classList.add('container__auteur')
                auteur.innerText = `${response.nom}.${response.prenom}(${response.date})`

            const publication = document.createElement('div')
                publication.classList.add('container__photo')

            const image = document.createElement('img')

            const texte = document.createElement('p')
                texte.classList.add('container__texte')
                texte.innerText = `${response.message}`

            publicationWindow.appendChild(container)
            container.appendChild(auteur)
            container.appendChild(publication)
            container.appendChild(texte)
            publication.appendChild(image)


        }
    })
    .catch(function(error){
        console.log({ error })
    })
}
showPublications()
