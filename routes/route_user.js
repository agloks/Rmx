const color = require("chalk")
const router = require("./route_raiz.js")
const b = require("bcrypt")
const util = require("util")
const comment = require("../models/schemaComment.js")
const user = require("../models/schemaUser.js")

async function updateUser(id, reqs) {
  let bSalt =  b.genSaltSync(7)
  let bHash =  b.hashSync(reqs.password, bSalt)
  reqs.password = bHash
  var msg = null
  await user.findByIdAndUpdate(id, reqs).then((e) => {return e;msg = 1}).catch((e) => {msg = e;throw new Error(e)})
  return msg
}

// ROUTE GET -- PARA VER O PERFIL DO USUÁRIO
router.get("/user-profile", async (req, res) => {
  console.log(color.red("ESTOU NA ROTA GET USER-PROFILE"))
  
  let userCookies = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  if(userCookies !== null) { //se usuário tiver logado
    const userFoundBd = await user.findById(userCookies)
    res.render("user/user.hbs", userFoundBd) //passando o documento do bd para o hbs
  } else { res.render("user/user.hbs", {error: "nao logado, logue para ter acesso aqui"}) }//caso de não logado
})

router.get("/user-profile/edit", (req,res) => {
  console.log(color.red("ESTOU NA ROTA GET USER-PROFILE EDIT"))

  res.render("user/user-edit.hbs")
})

//ROUTE POST -- PARA EDITAR
router.post("/user-profile/edit", async(req, res) => {
  console.log(color.red("ESTOU NA ROTA POST USER-PROFILE EDIT"))

  let userCookies = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  if(userCookies !== null) { //se usuário tiver logado
    const userUpdateBd = await updateUser(userCookies, req.body)
    console.log(userUpdateBd)
    res.redirect("/user-profile") //passando o documento do bd para o hbs
  } else { res.render("user/user-edit.hbs", {error: "erro nas mudanças"}) }//caso de não logado
})