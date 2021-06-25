let btnMultimedia = document.getElementById("btn-multi")
let btnChat = document.getElementById("btn-chat")
let btnProfil = document.getElementById("btn-profil")
let multimedia = document.getElementById("multimedia")
let chat = document.getElementById("chat")

let borderBlock = ()=>{
    btnMultimedia.style.borderBottom = "1px grey solid"
    btnChat.style.borderBottom = "1px grey solid"
    btnProfil.style.borderBottom = "1px grey solid"
}
let eventBtn = (e,value1,value2,value3)=>{
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