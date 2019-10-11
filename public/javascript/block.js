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


async function commentsShowTutorial() {

  let comments = document.getElementsByClassName("div-comments")[0]
  let section = document.getElementById("section-comments")
  let main = document.getElementById("main-owner-tutorial")
  let divHide = document.getElementsByClassName("view-erase")[0]
  let commentBox = document.getElementById("comment-box")

  // section.style.width = divHide.childNodes[0].childNodes[1].next
  // section.style.height = divHide.clientHeight

  //div-hide
  // divHide.style.display = "none"
  
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
    commentBox.append(newDiv)
  }

  // console.log(routeComment)
  // console.log(axiosComment)
}

if(document.getElementById("comments-view") !== null) {
  document.getElementById("comments-view").onclick = commentsShowTutorial
}

async function commentsShowVitrine() {

  let comments = document.getElementsByClassName("div-comments")[0]
  let section = document.getElementById("section-comments")
  let main = document.getElementById("main-owner-tutorial")
  let divHide = document.getElementsByClassName("view-erase")[0]
  let commentBox = documement.getElementById('comment-box')
  
  //pegando o id do article
  let routeComment = document.URL.replace(/vitrine\/owner?/,"comments-project/view")
  const axiosComment = await axios.get(routeComment)

  //div-hide
  // divHide.style.display = "none"

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
    commentBox.append(newDiv)
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
    let divHide = document.getElementsByClassName("view-erase")[0]
    // console.log(divs)
    let count = 0
    while(divs.length !== 0) //Porque sem chaves ele funciiona, e com chaves travas?
      sectionComments.removeChild(divs[count])
      count += 1
      // console.log(divs)
    if(divs.length === 0) { sectionComments.style.display = "none" }
    divHide.style.display = "flex"
  }
}


if(document.getElementById("comments-view-vitrine") !== null) {
  document.getElementById("comments-view-vitrine").onclick = commentsShowVitrine
}

/* 
todas-funçoes:
  // divHide.style.display = "none"
*/