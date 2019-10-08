const color = require("chalk")
const router = require("./route_raiz.js")
const util = require("util")
const article = require("../models/schemaArticle.js")
// const user = require("../models/schemaUser.js")

//FUNCÕES
//Função para cria o tutorial
async function createArticle(reqs) {
  article.create(reqs).then((s) => console.log(s)).catch((e) => console.log(e))
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
  console.log( color.red(">>> To no tutorial post \n" + req.cookies.Connection + "\n" + req.body) );
  if(req.body.text !== "")
  {
    req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null//colocamos o id do user para o objeto req.body
    await createArticle(req.body)//criando o tutorial
    console.log(req.body)
    res.render("tutoriais/tutorial-owner.hbs", req.body) //mandamos para o hbs o objeto para manipular
  } else { res.render("tutoriais/tutorial-edit.hbs"), { error: "Falha ao criar o post" } }
})