let connect = document.getElementById("connect")
let signup = document.getElementById("signup")
let connexion = document.getElementById("connexion")
let inscription = document.getElementById("inscription")

connect.addEventListener("click",function(e){
    e.preventDefault()
    if(connexion.style.display == "block"){
        connexion.style.display = "none"
    }
    else{
        connexion.style.display = "block"
    }
    inscription.style.display = "none"
})
signup.addEventListener("click",function(e){
    e.preventDefault
    if (inscription.style.display == "block"){
        inscription.style.display = "none"
    }
    else{
        inscription.style.display = "block"
    }
    connexion.style.display = "none"
})