const btnChat = document.getElementById("btn-chat")
const btnProfil = document.getElementById("btn-profil")
const publicationWindow = document.getElementById('publication')
const urlPublications ='http://localhost:3000/api/publications'
const access = JSON.parse(localStorage.getItem('access'))
const userId = access.userId
const token = access.token
import {reload} from './functions.js'
/*Matérialise une bordure aux boutons multimédia,chat et profil*/
btnChat.addEventListener("click",function(e){
    e.preventDefault()
    document.location.href="chat.html"
    btnChat.style.borderBottom = "transparent"
})
btnProfil.addEventListener("click",function(e){
    e.preventDefault()
    document.location.href="profil.html"
    btnProfil.style.borderBottom = "transparent"
})
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
        let i = 1
        for(let response of responses){
            const container = document.createElement('div')
                container.classList.add('publication__container')
            if(response.url){
                const publication = document.createElement('div')
                publication.classList.add('publication__container--photo')

                const image = document.createElement('img')
                    image.setAttribute('src',`${response.url}`)
                    image.setAttribute('alt','description de l\'image')

                    container.appendChild(publication)
                    publication.appendChild(image)

            }
            const texte = document.createElement('p')
                texte.classList.add('publication__container--texte')
                texte.innerText = `${response.message}`
            const auteur = document.createElement('h3')
                auteur.classList.add('publication__container--auteur')
                auteur.innerText = `${response.nom}.${response.prenom}(${response.date})`
            const notes = document.createElement('div')
                notes.classList.add('publication__container--notes')
                const like = document.createElement('input')
                    like.setAttribute('type','button')
                    like.setAttribute('value','like')
                    notes.appendChild(like)
                const countLikes = document.createElement('div')
                    countLikes.classList.add('count-like')
                    notes.appendChild(countLikes)
                const dislike = document.createElement('input')
                    dislike.setAttribute('type','button')
                    dislike.setAttribute('value','dislike')
                    notes.appendChild(dislike)
                const countDislikes = document.createElement('div')
                    countDislikes.classList.add('count-dislike')
                    notes.appendChild(countDislikes)    
                if(response.userId === userId){
                    let name =  `del-publication${i}`
                    let test = document.createElement('input')
                        test.classList.add('publication__container--del')
                        test.setAttribute('id',`${name}`)
                        test.setAttribute('type','button')
                        test.setAttribute('value','supprimer') 
                        container.appendChild(test)
                    /*boucle des écouteurs d'évènements pour chaques publications correspondantes au userId de l'utilisateur.*/
                    test.addEventListener('click',function(){
                        fetch(`${urlPublications}/${response.id}`,{
                            method:'DELETE',
                            headers:{
                                'Authorization':'Bearer '+token
                            }
                        })
                        .then((response) => {
                            document.location.reload()
                            console.log(response)
                        })
                        .catch((err) => console.log(err))
                    })
                        i++
                }
            
            publicationWindow.appendChild(container)
            container.appendChild(texte)
            container.appendChild(auteur)
            container.appendChild(notes)
        }
    })
    .catch(function(error){
        console.log({ error })
    })
}
showPublications()
/*Création d'une publication.*/
const fileUpload = document.getElementById('fileUpload')/*mon input type file*/
const formulaire = document.getElementById('formulaire-publication')/*Mon formulaire*/
const publier = document.getElementById('publier')/*Bouton de validation du formulaire*/
const message = document.getElementById('message')/*Message de la publication*/
publier.addEventListener('click',function(e){
    e.preventDefault()
    if(!fileUpload.value){
        const publication = {
            userId : userId,
            message: message.value
        }
    fetch(urlPublications,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        },
        body:JSON.stringify(publication)
    })
    .then((res) => { 
        return res.json()
    })
    .then((response) => {
        console.log(response)
        reload()
    })
    .catch((error) => { 
        console.log(error)
    })
    }
    else{
        let formData = new FormData(formulaire)
        formData.append('userId',userId)
        formData.append('message', message.value)
        /*Fonction qui boucle les éléments de formData dans un array pour visualiser le contenu*/
        function tableau(){
            let array = []
            for(let elt of formData.values()){
            console.log(elt)
            array.push(elt)
            }
            return array
        }
        /*visuel dans la console des éléments contenus dans le formData */
        const test = tableau(formData)
        console.log(test)

        fetch(urlPublications,{
            method:'POST',
            headers:{
                'Authorization':'Bearer '+token
            },
            body:formData
        })
        .then((res) => { 
            return res.json()
        })
        .then((response) => {
            console.log(response)
            reload()
        })
        .catch((error) => { 
            console.log(error)
        })
    }
})