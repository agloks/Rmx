const color = require("chalk")
const router = require("./route_raiz.js")
const user = require("../models/schemaUser.js")
const b = require("bcrypt")

//FUNCTIONS
//Função para cria o usario e da seu hash
async function newUser(reqs) {
  let bSalt =  b.genSaltSync(7)
  let bHash =  b.hashSync(reqs.password, bSalt)
  reqs.password = bHash
  var msg = null
  await user.create(reqs).then((e) => {console.log(e);msg = 1}).catch((e) => {msg = e;throw new Error(e)})
  return msg
}

//GET
router.get("/sign", (req, res) => {
  res.render("login&&sign/sign.hbs")
})

//POST
router.post("/sign", async (req, res) => {
  const reqSave = req.body

  //fazemos verficação pelo tamanho dos campo escrito
  try {
    if( (reqSave.name.length) && (reqSave.password.length) && (reqSave.login.length) ) {
      reqSave.role = "Remixante" // passamos a sua role default
      await newUser(reqSave)
      res.redirect("/login")
    } else { res.render("login&&sign/sign.hbs", {error : `falha ao registrar, verificar se os campos tao registrado corretamente`} ) } 
  } catch (error) {
    res.render("login&&sign/sign.hbs", {error : "login ja existe"} )
  }
})