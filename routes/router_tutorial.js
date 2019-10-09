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
  res.render("tutoriais/tutorial-edit.hbs")
})

//POST
//pegamos o id do render sucess na rote_login
router.post("/tutorial/edit", async (req, res) => { // 2
  console.log( color.red(">>> To no tutorial post \n" + req.query.id ) );
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null//colocamos o id do user para o objeto req.body
  if(req.body.text !== "" && req.body.text !== undefined)//criando
  {
    if(req.body.userId !== null) { req.body.Article = await createArticle(req.body) }//criando o tutorial se ele ta em texto e logado
    res.render("tutoriais/tutorial-owner.hbs", req.body) //mandamos para o hbs o objeto para manipular
  }
  else if(req.body.text === undefined) { //só vendo
    req.body.userInformation = await article.findById(req.query.id).populate("userId")
    res.render("tutoriais/tutorial-owner.hbs", req.body) //mandamos para o hbs o objeto para manipular
  }
  else { //erro
    res.render("tutoriais/tutorial-edit.hbs"), { error: "Falha ao criar o post" } 
  }
})

//delete
router.post("/tutorial/remove" , (req, res) => {
  let idTutorialRemove = req.query.id
  console.log( "to na routa post remove Tutorial " + idTutorialRemove)

  if(idTutorialRemove) {
    article.findByIdAndRemove(idTutorialRemove)
    .then((s) => console.log(s))
    .catch((e) => console.log(e))
  }

  res.send("edit sucess")
})