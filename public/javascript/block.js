const axios = require("axios")

function enabledTextArea() {
  let textarea = document.getElementsByTagName("textarea")[0]

  // 0 ou 0 = 0 = Falso; 1 ou 0 = 1 = verdadeiro;
  if( document.cookie.match(/11111/) ) {
    textarea.removeAttribute("disabled") 
    } else { 
    textarea.setAttribute("disabled","disabled")
    }
}

if(document.getElementsByTagName("textarea").length) { enabledTextArea() }

// let comments = document.getElementById("comments-view").onclick = commentsShow

function commentsShow() {
  let comments = document.getElementById("comments-view")
  let section = document.getElementById("section-comments")
  let main = document.getElementById("main-owner-tutorial")

  //main
  main.style.position = "absolute"
  
  //section
  section.style.width = document.body.clientWidth
  section.style.height = document.body.clientHeight
  section.style.position = "absolute"
  section.style.background = "rgba(0,0,0,0.9)"
  section.style.zIndex = 20
}
axios.
document.getElementById("comments-view").onclick = commentsShow