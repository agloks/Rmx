function enabled() {
  let textarea = document.getElementsByTagName("textarea")[0]

  // 0 ou 0 = 0 = Falso; 1 ou 0 = 1 = verdadeiro;
  if( document.cookie.split("=")[1][0] === "1" ) {
    textarea.removeAttribute("disabled") 
    } else { 
    textarea.setAttribute("disabled","disabled")
    }
}

if(document.getElementsByTagName("textarea").length) { enabled() }