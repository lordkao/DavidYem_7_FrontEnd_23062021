function redirection (value){
    window.location = value
    window.location.reload()
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

export { redirection,actived,disabled,desactivation }  