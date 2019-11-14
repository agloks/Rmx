const router = require("./route_raiz.js")
const util = require("util")
const project = require("../models/schemaProject.js")

const user = require("../models/schemaUser.js")
const userIsLogged = require("../models/userLogged")
const multer = require("multer")
const cloudinary = require("cloudinary")
const uploadCloud = require("../cloudinary/cloud")
const parseRefererHeader = require("../models/parserRefererHeader")


//FUNCÕES
async function createProject(reqs) {
  let foundProject = project.create(reqs).then((s) => {console.log(s)}).catch((e) => console.log(e))
  return foundProject
} 

//GET ROUTE
router.get("/vitrine", async (req, res) => { // 1

  let idUserOwner = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  if(idUserOwner !== null) {
    var allProject = await project.find().populate("userId") 
  }
  else{ var allProject = await project.find().populate("userId") }
  res.render("vitrine/vitrine.hbs", {allProject} )
})

router.get("/vitrine/create", (req, res) => { //3
  res.render("vitrine/vitrine-create.hbs")
})

router.get("/vitrine/editView", (req,res) => {
  res.render("vitrine/vitrine-edit.hbs", {id: req.query.id})
})

//POST
router.post("/vitrine/edit", async(req, res) => { // 2
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null//colocamos o id do user para o objeto req.body

  const findProject = await project.findById(req.query.id).then((s)=> {return (s)})
  const enableEdit = (findProject.userId == req.body.userId)

  if((req.body.text !== "") && (req.body.title !== "") && (enableEdit) && (req.body.userId !== null))
  {
    req.body.Project = await project.findByIdAndUpdate(req.query.id, req.body)//criando o tutorial se ele ta em texto e logado
    res.redirect("/vitrine") 
  } else { 
    res.render("vitrine/vitrine-edit.hbs", { id: req.query.id ,error: "Falha ao criar o projeto, preencha os campo corretamente" }) 
  }
})

router.post("/vitrine/create", async(req, res) => {
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null//colocamos o id do user para o objeto req.body
  if((req.body.text !== "") && (req.body.title !== "") && (req.body.userId !== null))//criando
  {
    await createProject(req.body)//criando o tutorial se ele ta em texto e logado
    res.redirect("/vitrine") 
  } else { 
    res.render("vitrine/vitrine-create.hbs", { error: "Falha ao criar o projeto, preencha os campo corretamente" }) 
  }
})

router.post("/vitrine/owner", async (req, res) => { 
  const projectShow = await project.findById(req.query.id).populate("userId")

  req.body.id = req.query.id
  const userId = `"${userIsLogged(req)}"`
  
  if(userId === JSON.stringify(projectShow.userId._id)) {
    req.body.showButtonEdit = true
    req.body.Project = projectShow
    res.render("vitrine/vitrine-owner.hbs", req.body) 
  } else {
    req.body.showButtonEdit = null
    req.body.Project = projectShow
    res.render("vitrine/vitrine-owner.hbs", req.body) 
  }
})

//UPLOAD
router.post("/vitrine-download", uploadCloud.single("photo-vitrine"), async(req, res) => {
  let userCookies = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  const idProject = parseRefererHeader(req.headers)
  let foundUpdate = await project.findByIdAndUpdate(idProject, {image: `https://res.cloudinary.com/rmx/image/upload/v1573593577/user-rmx/${req.file.originalname}.${req.file.format}`} )
  res.redirect(307, `/vitrine/owner?id=${idProject}`)
})

//delete
router.post("/vitrine/remove" , async (req, res) => {
  let idVitrineRemove = req.query.id
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null

  const findProject = await project.findById(idVitrineRemove)
  const enableRemove = (findProject.userId == req.body.userId)

  if(idVitrineRemove && enableRemove) {
    project.findByIdAndRemove(idVitrineRemove)
    .catch((e) => console.log(e))
  }

  res.redirect("/vitrine")
})