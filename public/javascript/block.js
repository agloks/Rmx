function lgs() {
  let lgsLogout = document.getElementsByClassName("lgs")[1]
  let lgs = document.getElementsByClassName("lgs")[0]
  let aOfLgs = lgs.children[0]
  let aOfLgsLogout = lgsLogout.children[0]

  aOfLgs.innerHTML = "Profile"
  aOfLgs.setAttribute("href","/user-profile")

  aOfLgsLogout.innerHTML = "Logout"
  aOfLgsLogout.removeAttribute("href")
  aOfLgsLogout.setAttribute("href","/")
  aOfLgsLogout.setAttribute("onclick","eCS()")
}
if(document.cookie.match(/11111/)) { lgs() }

function eCS(){
  document.cookie = "Connection"+"=;expires=Thu, 01 Jan 1970 00:00:001 GMT"
}

function enabledTextArea() {
  let textarea = document.getElementsByTagName("textarea")[0]

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

}

if(document.getElementById("comments-view") !== null) {
  document.getElementById("comments-view").onclick = commentsShowTutorial
}

async function commentsShowVitrine() {

  let comments = document.getElementsByClassName("div-comments")[0]
  let section = document.getElementById("section-comments")
  let main = document.getElementById("main-owner-tutorial")
  let divHide = document.getElementsByClassName("view-erase")[0]
  let commentBox = document.getElementById('comment-box')
  
  //pegando o id do article
  let routeComment = document.URL.replace(/vitrine\/owner?/,"comments-project/view")
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

}


let sectionComments = document.getElementById("section-comments")
let exitComments = document.getElementsByClassName("exit-comments")[0]
// sectionComments.children
if(sectionComments !== null) {
  if(sectionComments.style.display !== "flex") {
    exitComments.onclick = () => {
      let divs = sectionComments.getElementsByTagName("div")
      let divHide = document.getElementsByClassName("view-erase")[0]
      let article = document.getElementById("comment-box")

      let count = 0
      while(divs.length !== 0) //Porque sem chaves ele funciiona, e com chaves travas?
        article.removeChild(divs[count])
        count += 1
      if(divs.length === 0) { sectionComments.style.display = "none" }
      divHide.style.display = "flex"
    }
  } 
}
if(document.getElementById("comments-view-vitrine") !== null) {
  document.getElementById("comments-view-vitrine").onclick = commentsShowVitrine
}


function editProfileImage() {
  let img = document.getElementsByClassName("image-switch")[0]
  let form = document.getElementsByClassName("upload-dom")[0]
  form.style.display = "flex"
}

if(document.getElementsByClassName("image-switch").length !== 0) {
  document.getElementsByClassName("image-switch")[0].onclick = editProfileImage
  document.getElementsByClassName("exit-upload-dom")[0].onclick = function(){
    let form = document.getElementsByClassName("upload-dom")[0]
    form.style.display = "none"
  }
}