const color = require("chalk")
const router = require("./route_raiz.js")
const util = require("util")
const article = require("../models/schemaArticle.js")
const user = require("../models/schemaUser.js")

//FUNCÕES
//Função para cria o tutorial
async function createArticle(reqs) {
  let foundArticle = article.create(reqs).then((s) => {return s}).catch((e) => console.log(e))
  return foundArticle
} 

//GET ROUTE
//Tutorial do visitante, sem permissão de editar
router.get("/tutorial", async (req, res) => { // 1
  console.log( color.red(">>> To no tutorial get \n") )
  //vemos se o usuario ta logado
  let idUserOwner = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  if(idUserOwner !== null) {
    console.log(idUserOwner)
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
  console.log("to no get editView" + util.inspect(req.query))
  res.render("tutoriais/tutorial-edit", {id:req.query.id})
})

//POST
//pegamos o id do render sucess na rote_login
router.post("/tutorial/edit", async(req, res) => { // 2
  console.log( color.red(">>> To no tutorial post edit \n" + util.inspect(req.query) ) );
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null//colocamos o id do user para o objeto req.body

  const findArticle = await article.findById(req.query.id)
  const enableEdit = (findArticle.userId == req.body.userId)

  if(req.body.text !== "" && req.body.title !== "" && enableEdit)//criando
  {
    if(req.body.userId !== null) { req.body.Article = await article.findByIdAndUpdate(req.query.id, req.body) }//criando o tutorial se ele ta em texto e logado
    res.render("tutoriais/tutorial-owner.hbs", req.body) //mandamos para o hbs o objeto para manipular
  } else { //erro
    res.render("tutoriais/tutorial-edit.hbs", { error: "Falha ao criar o post, preencha os campo corretamente" }) 
  }
})

router.post("/tutorial/create", async(req, res) => {
  console.log( color.red(">>> To no tutorial post create \n" + req.query.id ) );
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null//colocamos o id do user para o objeto req.body
  if(req.body.text !== "" && req.body.title !== "" )//criando
  {
    if(req.body.userId !== null) { req.body.Article = await createArticle(req.body) }//criando o tutorial se ele ta em texto e logado
    res.redirect("/tutorial") //mandamos para o hbs o objeto para manipular
  } else { //erro
    res.render("tutoriais/tutorial-create.hbs", { error: "Falha ao criar o post, preencha os campo corretamente" }) 
  }
})

//AQUI SÓ VEMOS O RESULTADO ESPECIFICO, VINDO DE ALL TUTORIALs
router.post("/tutorial/owner", async (req, res) => { // 2
  console.log( color.red(">>> To no tutorial owner \n" + req.query.id ) );
  req.body.id = req.query.id
  req.body.userInformation = await article.findById(req.query.id).populate("userId")
  console.log( color.red(">>> To no tutorial owner \n" + util.inspect(req.body) ) );
  res.render("tutoriais/tutorial-owner.hbs", req.body) //mandamos para o hbs o objeto para manipular
})

//delete
router.post("/tutorial/remove" , async (req, res) => {
  let idTutorialRemove = req.query.id
  console.log( "to na routa post remove Tutorial " + idTutorialRemove)
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null

  const findArticle = await article.findById(idTutorialRemove)
  const enableRemove = (findArticle.userId == req.body.userId)
  
  if(idTutorialRemove && enableRemove) {
    article.findByIdAndRemove(idTutorialRemove)
    .then((s) => console.log(s))
    .catch((e) => console.log(e))
  }

  res.redirect("/tutorial")
})