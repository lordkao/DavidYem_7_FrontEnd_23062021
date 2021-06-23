let btnMultimedia = document.getElementById("btn-multi")
let btnChat = document.getElementById("btn-chat")
let multimedia = document.getElementById("multimedia")
let chat = document.getElementById("chat")

btnMultimedia.addEventListener("click",function(e){
    e.preventDefault()
    if(multimedia.style.display == "block"){
        multimedia.style.display = "none"
    }
    else{
        multimedia.style.display = "block"
    }
    chat.style.display = "none"
})
btnChat.addEventListener("click",function(e){
    e.preventDefault()
    if(chat.style.display == "block"){
        chat.style.display = "none"
    }
    else{
        chat.style.display = "block"
    }
    multimedia.style.display = "none"
})