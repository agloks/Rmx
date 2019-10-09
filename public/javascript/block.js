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


async function commentsShow() {
  let comments = document.getElementById("div-comments")
  let section = document.getElementById("section-comments")
  let main = document.getElementById("main-owner-tutorial")
  
  //pegando o id do article
  let routeComment = document.URL.replace(/tutorial\/owner?/,"comments-tutorial/view")
  const axiosComment = await axios.get(routeComment)

   //main
   main.style.position = "absolute"
  
  //section
  section.style.width = "100rem"
  section.style.height = "100rem"
  section.style.position = "absolute"
  section.style.background = "rgba(0,0,0,0.9)"
  section.style.zIndex = 20

  //div do commentario
  comments.style.color = "white"
  comments.innerHTML = axiosComment.data.text

  console.log(routeComment)
  console.log(axiosComment)
}


document.getElementById("comments-view").onclick = commentsShow