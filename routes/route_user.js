const color = require("chalk")
const router = require("./route_raiz.js")
const b = require("bcrypt")
const util = require("util")
const comment = require("../models/schemaComment.js")
const user = require("../models/schemaUser.js")
const multer = require("multer")
const cloudinary = require("cloudinary")
const uploadCloud = require("../cloudinary/cloud")


async function updateUser(id, reqs) {
  let bSalt =  b.genSaltSync(7)
  let bHash =  b.hashSync(reqs.password, bSalt)
  reqs.password = bHash
  var msg = null
  await user.findByIdAndUpdate(id, reqs).then((e) => {return e;msg = 1}).catch((e) => {msg = e;throw new Error(e)})
  return msg
}

router.get("/user-profile", async (req, res) => {
  
  let userCookies = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  if(userCookies !== null) { //se usuário tiver logado
    const userFoundBd = await user.findById(userCookies)
    res.render("user/user.hbs", userFoundBd) //passando o documento do bd para o hbs
  } else { res.send("<h1>acesso não autorizado<h1>") }
})

router.get("/user-profile/edit", async (req,res) => {
  let userCookies = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  let sendUserObject = await user.findById(userCookies)
  res.render("user/user-edit.hbs", sendUserObject)
})

//ROUTE POST
router.post("/user-profile/edit", async(req, res) => {

  let userCookies = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  if(userCookies !== null) { //se usuário tiver logado
    const userUpdateBd = await updateUser(userCookies, req.body)
    res.redirect("/user-profile") 
  } else { res.render("user/user-edit.hbs", {error: "erro nas mudanças"}) }
})

//UPLOAD
router.post("/user-download", uploadCloud.single('photo'), async(req, res) => {
  let userCookies = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  let foundUpdate = await user.findByIdAndUpdate(userCookies, {image: `https://res.cloudinary.com/rmx/image/upload/v1573593577/user-rmx/${req.file.originalname}.${req.file.format}`} )
  .then((s) => { return s })
  res.redirect("/user-profile")
})