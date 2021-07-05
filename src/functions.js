function redirection(value){
    document.location.replace(value)
}
function reload(){
    document.location.reload()
}
function actived(values){
    for(let value of values){
        value.disabled = false
    }
}
function disabled(values){
    for(let value of values){
        value.disabled = true
    }
}
class desactivation{
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
function requete(url,token,body){
    fetch(url,{
        method:'POST',
        headers:{
            'Authorization':'Bearer '+token,
            'Content-Type':'application/json'},
        body:JSON.stringify(body)
    })
    .then((res) => {if(res.ok){res.json()}})
    .catch((err) => console.log(err))
}
function getLikes(url,token,compteur){
    fetch(url,{headers:{'Authorization':'Bearer '+token}})
    .then((res)=>{
        if(res.ok){return res.json()}
    })
    .then((response)=>{
        compteur.textContent = response.compteur
    })
    .catch((err)=>console.log(err))
} 
function getNote(url,token,like){
    fetch(url,{headers:{'Authorization':'Bearer '+token}})
    .then((res)=>{
        if(res.ok){return res.json()}
    })
    .then((response)=>{
        let value = response.note
        if(value == 1){
            like.classList.add('scale')
            return value
        }
        else if(value == -1){
            like.classList.add('scale')
            return value
        }
        else if(value == 0){
            like.classList.remove('scale')
            return value
        }
    })
    .then((note) => {
        console.log(note)
    })
    .catch((err)=>console.log(err))
} 
export { redirection,reload,actived,disabled,desactivation,requete,getLikes,getNote }  