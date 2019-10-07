const color = require("chalk")
const router = require("./route_raiz.js")
const user = require("../models/schemaUser.js")
const b = require("bcrypt")

//FUNCTIONS
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
  console.log( color.red(">>> To no sign get\n") )
  res.render("login&&sign/sign.hbs")
})

//POST
router.post("/sign", async (req, res) => {
  console.log( color.red(">>> To no sign post\n") )
  const reqSave = req.body
  console.log( reqSave )

  try {
    if( (reqSave.name.length) && (reqSave.password.length) && (reqSave.login.length) ) {
      reqSave.role = "Remixante"
      await newUser(reqSave)
      res.redirect("/login")
    } else { res.render("login&&sign/sign.hbs", {fail : `falha para registrar, verificar se os campos tao registrado corretamente`} ) } 
  
  } catch (error) {
    console.log("error found sign " + error)  
    res.render("login&&sign/sign.hbs", {fail : "login ja existe"} )
  }
})