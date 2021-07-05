const btnChat = document.getElementById("btn-chat")
const btnProfil = document.getElementById("btn-profil")
const publicationWindow = document.getElementById('publication')
const urlPublications ='http://localhost:3000/api/publications'
const access = JSON.parse(localStorage.getItem('access'))
const userId = access.userId
const token = access.token
import {reload,requete,getLikes,getNote,blocErreur,invalidInputText} from './functions.js'
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
let i = 1
let note = `notes${i}`
note = 0
function showPublications(url){
    fetch(url,{
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
        /*Boucle qui va créer les publications à partir des données reçues*/
        for(let response of responses){
            const urlLike = `${urlPublications}/${response.id}/like`
            const urlDislike = `${urlPublications}/${response.id}/dislike`
            const urlNoteLike = `${urlPublications}/${response.id}/like/${userId}`
            const urlNoteDislike = `${urlPublications}/${response.id}/dislike/${userId}`
            
            
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
                const like = document.createElement('span')
                    like.innerHTML = `<i class="fas fa-thumbs-up"></i>`
                    like.classList.add('like')
                    like.setAttribute('id',`like${i}`)
                    notes.appendChild(like)
                    getNote(urlNoteLike,token,like,"1")
                    
                    like.addEventListener('click',function(e){
                        if(note == 0){
                            note=1
                            like.classList.add('scale')
                        }
                        else if(note == 1){
                            note=0
                            like.classList.remove('scale')
                        }
                        let body = { 
                            like : note,
                            userId : userId,
                        }
                        requete(urlLike,token,body)
                    })
                const countLikes = document.createElement('div')
                    countLikes.classList.add('count-like')
                    notes.appendChild(countLikes)
                    getLikes(urlLike,token,countLikes)
                const dislike = document.createElement('span')
                    dislike.innerHTML =`<i class="fas fa-thumbs-down"></i>`
                    dislike.classList.add('dislike')
                    dislike.setAttribute('id',`dislike${i}`)
                    notes.appendChild(dislike)
                    getNote(urlNoteDislike,token,dislike,"-1")

                    dislike.addEventListener('click',function(e){
                        if(note == 0){
                            note=-1
                            dislike.classList.add('scale')
                        }
                        else if(note == -1){
                            note=0
                            dislike.classList.remove('scale')
                        }
                        let body = { 
                            like : note,
                            userId : userId,
                        }
                        requete(urlLike,token,body)
                    })
                const countDislikes = document.createElement('div')
                    countDislikes.classList.add('count-dislike')
                    notes.appendChild(countDislikes)    
                    getLikes(urlDislike,token,countDislikes)
                    /*Affichage de supprimer si l'utilisateur à créer la publication*/
                if(response.userId && response.userId === userId){
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
                            reload()
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


            /*Définis si le user a liké ou disliké la publication
            if(response.like == 1){
                like.classList.add('scale')
            }
            else if(response.like == -1){
                dislike.classList.add('scale')
            }
            else if(response.like == 0){
                like.classList.remove('scale')
                dislike.classList.remove('scale')
            }*/
        }
        console.log(note)
    })
    .catch(function(error){
        console.log({ error })
    })
}
showPublications(urlPublications)

/*Obtenir plus de publications*/
const oldPublications = document.getElementById('old-publications')
let numberOfPublications = 10
oldPublications.addEventListener('click',function(e){
    showPublications(`${urlPublications}/${numberOfPublications}`)
    numberOfPublications += 10
})

/*Création d'une publication.*/
const fileUpload = document.getElementById('fileUpload')/*mon input type file*/
const formulaire = document.getElementById('formulaire-publication')/*Mon formulaire*/
const publier = document.getElementById('publier')/*Bouton de validation du formulaire*/
const message = document.getElementById('message')/*Message de la publication*/
/*Définition de message d'erreur à afficher*/
const errorMessage = invalidInputText('publication-edit','Veuillez renseignez un message ou envoyer un fichier pour pouvoir publier')

publier.addEventListener('click',function(e){
    e.preventDefault()
    if(message.value == false & fileUpload.value == false){
        errorMessage.style.display='flex'
    }
    else if(!fileUpload.value){
        errorMessage.style.display = "none"
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
        errorMessage.style.display = "none"
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

               