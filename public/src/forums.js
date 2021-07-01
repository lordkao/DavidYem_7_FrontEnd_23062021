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

/*Matérialise une bordure aux boutons multimédia,chat et profil*/
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
/*Fonction pour afficher toutes les publications.*/
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
                container.classList.add('publication__container')

            const auteur = document.createElement('h3')
                auteur.classList.add('publication__container--auteur')
                auteur.innerText = `${response.nom}.${response.prenom}(${response.date})`

            const publication = document.createElement('div')
                publication.classList.add('publication__container--photo')

            const image = document.createElement('img')

            const texte = document.createElement('p')
                texte.classList.add('publication__container--texte')
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