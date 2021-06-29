const btnChat = document.getElementById("btn-chat")
const btnProfil = document.getElementById("btn-profil")
const multimedia = document.getElementById("multimedia")
const publicationWindow = document.getElementById('publication')
const access = JSON.parse(localStorage.getItem('access'))
const userId = access.userId
const token = access.token

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

const urlPublications ='http://localhost:3000/api/publications'

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