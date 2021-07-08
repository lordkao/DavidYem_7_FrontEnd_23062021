function redirection(value){/*redirection sur value*/
    document.location.replace(value)
}
function reload(){/*recharge la page*/
    document.location.reload()
}
function actived(values){/*affiche les éléments disabled en bouclant dans values*/
    for(let value of values){
        value.disabled = false
    }
}
function disabled(values){/*Cache les éléments disabled en bouclant dans values*/
    for(let value of values){
        value.disabled = true
    }
}
class desactivation{/*Création d'une classe pour gérer l'affichage des boutons*/
    constructor(bouton1,bouton2,bouton3,bouton4,label){
        this.bouton1 = bouton1
        this.bouton2 = bouton2
        this.bouton3 = bouton3
        this.bouton4 = bouton4
        this.label = label
    }
    hide1(){
        this.label.style.display = 'flex'
        this.bouton1.disabled = true
        this.bouton2.disabled = false
        this.bouton3.disabled = false
    }
    hide2(){
        this.label.style.display = 'none'
        this.bouton1.disabled = false
        this.bouton2.disabled = true
        this.bouton3.disabled = true
    }
    hide3(){
        this.label.style.display = 'none'
        this.bouton1.disabled = false
        this.bouton2.disabled = true
        this.bouton3.disabled = true
    }
    hideAll(){
        this.label.style.display = 'none'
        this.bouton1.disabled = true
        this.bouton2.disabled = true
        this.bouton3.disabled = true
        this.bouton4.disabled = true
    }
}
function postLike(url,token,body,note,compteur){/*Exécution d'une simple requête POST pour envoyer le like*/
    fetch(url,{
        method:'POST',
        headers:{
            'Authorization':'Bearer '+token,
            'Content-Type':'application/json'},
        body:JSON.stringify(body)
    })
    .then((res) => {
        if(res.ok){
            res.json()
            .then((response) => {
                console.log(response.like)
                note = response.like
                getLikes(url,token,compteur)
            })
        }
        else{
            console.log(res)
        }
    })
    .catch((err) => console.log(err))
}
function getLikes(url,token,compteur){/*Exécution d'une requête GET et affiche le resultat dans compteur*/
    fetch(url,{headers:{'Authorization':'Bearer '+token}})
    .then((res)=>{
        if(res.ok){return res.json()}
    })
    .then((response)=>{
        compteur.textContent = response.compteur
    })
    .catch((err)=>console.log(err))
} 
function getOneLike(url,token,note,like,dislike){/*Exécution d'une requête GET et return value*/
    fetch(url,{headers:{'Authorization':'Bearer '+token}})
    .then((res)=>{
        if(res.ok){return res.json()}
    })
    .then((response)=>{
        note = response.note
        if(note == 1){
            like.classList.add('scale')
        }
        else if(note == -1){
            dislike.classList.add('scale')
        }
        console.log(note)
    })
    .catch((err)=>console.log(err))
} 
function blocErreur(flex,none1,none2){/*Affiche ou cache invalid*/
    flex.style.display='flex'
    none1.style.display='none'
    none2.style.display='none'
}
function blocErreur2(flex,none1,none2,none3,none4){/*Affiche ou cache invalid*/
    flex.style.display='flex'
    none1.style.display='none'
    none2.style.display='none'
    none3.style.display='none'
    none4.style.display='none'
}
function invalidInputText(id,message){/*Créer un bloc erreur*/
    let invalid = document.createElement("div")
    invalid.classList.add("help-message")
    let champ = document.getElementById(id) 
    champ.appendChild(invalid)
    invalid.innerText = message
    invalid.style.display = "none"
    return invalid
}
export { redirection,reload,actived,disabled,desactivation,postLike,getLikes,blocErreur,blocErreur2,invalidInputText,getOneLike }  