const color = require("chalk")
const router = require("./route_raiz.js")
const util = require("util")
const article = require("../models/schemaArticle.js")
const user = require("../models/schemaUser.js")
const userIsLogged = require("../models/userLogged")
const multer = require("multer")
const cloudinary = require("cloudinary")
const uploadCloud = require("../cloudinary/cloud")
const parseRefererHeader = require("../models/parserRefererHeader")

//FUNCÕES
//Função para cria o tutorial
async function createArticle(reqs) {
  let foundArticle = article.create(reqs).then((s) => {return s}).catch((e) => console.log(e))
  return foundArticle
} 

//GET ROUTE
//Tutorial do visitante, sem permissão de editar
router.get("/tutorial", async (req, res) => { // 1
  //vemos se o usuario ta logado
  let idUserOwner = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  if(idUserOwner !== null) {
    //PRECISAMOS MEXER AQUI, PARA QUE QUANDO ELE TIVER LOGADO O QUE ELE PODERA FAZER?
    var allTutorial = await article.find().populate("userId") // array de todos os documentos achado
  }
  else{ var allTutorial = await article.find().populate("userId") }//DEFAULT MOSTRAMOS A QUEM PERTENCE O TEXTO
  res.render("tutoriais/tutorial.hbs", {allTutorial} )
})

//Routa que leva a permitir cria o tutorial
router.get("/tutorial/create", (req, res) => { //3
  res.render("tutoriais/tutorial-create.hbs")
})

router.get("/tutorial/editView", (req, res) => {
  res.render("tutoriais/tutorial-edit", {id:req.query.id})
})

//POST
//pegamos o id do render sucess na rote_login
router.post("/tutorial/edit", async(req, res) => { // 2
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null//colocamos o id do user para o objeto req.body

  const findArticle = await article.findById(req.query.id)
  const enableEdit = (findArticle.userId == req.body.userId)

  if((req.body.text !== "") && (req.body.title !== "") && (enableEdit) && (req.body.userId !== null))//criando
  {
    if(req.body.userId !== null) { req.body.Article = await article.findByIdAndUpdate(req.query.id, req.body) }//criando o tutorial se ele ta em texto e logado
    res.render("tutoriais/tutorial-owner.hbs", req.body) //mandamos para o hbs o objeto para manipular
  } else { //erro
    res.render("tutoriais/tutorial-edit.hbs", { id: req.query.id, error: "Falha ao criar o post, preencha os campo corretamente" }) 
  }
})

router.post("/tutorial/create", async(req, res) => {
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null//colocamos o id do user para o objeto req.body
  if((req.body.text !== "") && (req.body.title !== "") && (req.body.userId !== null))//criando
  {
    if(req.body.userId !== null) { req.body.Article = await createArticle(req.body) }//criando o tutorial se ele ta em texto e logado
    res.redirect("/tutorial") //mandamos para o hbs o objeto para manipular
  } else { //erro
    res.render("tutoriais/tutorial-create.hbs", { error: "Falha ao criar o post, preencha os campo corretamente" }) 
  }
})

//AQUI SÓ VEMOS O RESULTADO ESPECIFICO, VINDO DE ALL TUTORIALs
router.post("/tutorial/owner", async (req, res) => { // 2
  req.body.id = req.query.id
  const userId = `"${userIsLogged(req)}"`
  const articleShow = await article.findById(req.query.id).populate("userId")
  if(userId === JSON.stringify(articleShow.userId._id)) {
    req.body.showButtonEdit = true
    req.body.userInformation = articleShow
    res.render("tutoriais/tutorial-owner.hbs", req.body) //mandamos para o hbs o objeto para manipular
  } else {
    req.body.showButtonEdit = null
    req.body.userInformation = articleShow
    res.render("tutoriais/tutorial-owner.hbs", req.body) //mandamos para o hbs o objeto para manipular
  }
})

//UPLOAD
router.post("/tutorial-download", uploadCloud.single("photo-tutorial"), async(req, res) => {
  let userCookies = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  const idArticle = parseRefererHeader(req.headers)
  let foundUpdate = await article.findByIdAndUpdate(idArticle, {image: `https://res.cloudinary.com/rmx/image/upload/v1573593577/user-rmx/${req.file.originalname}.${req.file.format}`} )
  res.redirect(307, `/tutorial/owner?id=${idArticle}`)
})

//delete
router.post("/tutorial/remove" , async (req, res) => {
  let idTutorialRemove = req.query.id
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null

  const findArticle = await article.findById(idTutorialRemove)
  const enableRemove = (findArticle.userId == req.body.userId)
  
  if(idTutorialRemove && enableRemove) {
    article.findByIdAndRemove(idTutorialRemove)
    .catch((e) => console.log(e))
  }

  res.redirect("/tutorial")
})