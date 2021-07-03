const btnMultimedia = document.getElementById("btn-multi")
const btnProfil = document.getElementById("btn-profil")
const chatWindow = document.getElementById('chat-window')
const access = JSON.parse(localStorage.getItem('access'))
const userId = access.userId
const token = access.token
const urlChat ='http://localhost:3000/api/chat'
import { reload } from './functions.js'

btnMultimedia.addEventListener("click",function(e){
    e.preventDefault()
    document.location.href="multimedia.html"
})
btnProfil.addEventListener("click",function(e){
    e.preventDefault()
    document.location.href="profil.html"
})
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
        let i = 1
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
            
            if(response.userId && response.userId == userId){
                let name = `del-message${i}`
                let del = document.createElement('input')
                    del.classList.add('container-chat__del')
                    del.setAttribute('id',`${name}`)
                    del.setAttribute('type','button')
                    del.setAttribute('value','supprimer')
                    containerMessage.appendChild(del)
                    del.addEventListener('click',function(){
                        fetch(`${urlChat}/${response.id}`,{
                            method:'DELETE',
                            headers:{
                                'Authorization':'Bearer '+token
                            }
                        })
                        .then((res) => {
                            if(res.ok){
                                return res.json()
                            }
                        })
                        .then((response) => {
                            reload()
                            console.log(response)
                        })
                        .catch((err) => console.log({message:err}))
                    })
                    console.log(name)
                    i++
                    
            }
            
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
/*Création de message*/
validationMessage.addEventListener("click",function(e){
    e.preventDefault()
    const objetMessage = { 
        message:nouveauMessage.value,
        userId:userId,
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
        reload()
        console.log(response)
    })
    .catch((err) => console.log({message:err}))
})