const color = require("chalk")
const router = require("./route_raiz.js")
const util = require("util")
const article = require("../models/schemaArticle.js")
// const user = require("../models/schemaUser.js")

//FUNCÕES
//Função para cria o tutorial
async function createArticle(reqs) {
  let articleRepost =  await article.create(reqs)
  console.log(articleRepost)
  return articleRepost
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

//POST ROUTE
//pegamos o id do render sucess na rote_login
router.post("/tutorial/create", async (req, res) => { // 2
  console.log( color.red(">>> To no tutorial post \n") );
  if(req.body.text !== "")
  {
    req.body.userId = req.cookies.Connection.id//colocamos o id do user para o objeto req.body
    req.body._id = await createArticle(req.body).then((s) => {return s.id})//criando o tutorial e pegando o id do mesmo
    console.log(req.body)
    res.render("tutoriais/tutorial-owner.hbs", req.body ) //mandamos para o hbs o objeto para manipular
  } else { res.render("tutoriais/tutorial-create.hbs"), { error: "Falha ao criar o post" } }
})

//PUT ROUTE (por enquanto usando o get, temos que mudar depois)
//Aqui pegamos o id do post e do owner e permitimos editar
router.get("/tutorial/edit", (req, res) => {
  console.log( "to na routa get edit tutorial " + req.query.id )
  res.render("tutoriais/tutorial-edit.hbs", {id:req.query.id})
})

//ROUTE POST
//Edit
router.post("/tutorial/edit" , (req, res) => {
  let idTutorialEdit = req.query.id
  console.log( "to na routa post edit tutorial " + idTutorialEdit + "\n" + req.body.text)

  if(idTutorialEdit) {
    article.findByIdAndUpdate(idTutorialEdit, {text: req.body.text})
    .then((s) => article.findById(idTutorialEdit).then((s)=>console.log(s)).catch((e)=>error))
    .catch((e) => console.log(e))
  }

  res.send("edit sucess")
})

//delete
router.post("/tutorial/remove" , (req, res) => {
  let idTutorialRemove = req.query.id
  console.log( "to na routa post remove tutorial " + idTutorialRemove)

  if(idTutorialRemove) {
    article.findByIdAndRemove(idTutorialRemove)
    .then((s) => console.log(s))
    .catch((e) => console.log(e))
  }

  res.send("edit sucess")
})