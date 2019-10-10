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

  let comments = document.getElementsByClassName("div-comments")[0]
  let section = document.getElementById("section-comments")
  let main = document.getElementById("main-owner-tutorial")
  
  //pegando o id do article
  let routeComment = document.URL.replace(/tutorial\/owner?/,"comments-tutorial/view")
  const axiosComment = await axios.get(routeComment)

  //main
  main.style.position = "absolute"
  
  //section
  section.style.display = "flex"

  //div do commentario
  for(let textInArrayComments of axiosComment.data.replyes)
  {
    let newDiv = document.createElement("div")
    newDiv.setAttribute("class","div-comments")
    newDiv.innerHTML = await textInArrayComments.text
    section.append(newDiv)
  }

  // console.log(routeComment)
  // console.log(axiosComment)
}

let sectionComments = document.getElementById("section-comments")
let exitComments = document.getElementsByClassName("exit-comments")[0]
// sectionComments.children
if(sectionComments.style.display !== "flex") {
  exitComments.onclick = () => {
    let divs = sectionComments.getElementsByTagName("div")
    console.log(divs)
    let count = 0
    while(divs.length !== 0) //Porque sem chaves ele funciiona, e com chaves travas?
      sectionComments.removeChild(divs[count])
      count += 1
      console.log(divs)
    if(divs.length === 0) { sectionComments.style.display = "none" }
  }
}

document.getElementById("comments-view").onclick = commentsShow