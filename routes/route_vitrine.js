const color = require("chalk")
const router = require("./route_raiz.js")
const util = require("util")
const project = require("../models/schemaProject.js")

//FUNCÕES
//Função para cria o vitrine
// async function createProject(reqs) {
//   let projectRepost =  await project.create(reqs)
//   console.log(projectRepost)
//   return projectRepost
// } 

// //GET ROUTE
// //vitrine do visitante, sem permissão de editar
// router.get("/vitrine", async (req, res) => { // 1
//   console.log( color.red(">>> To no project get \n") )
//   //vemos se o usuario ta logado
//   let idUserOwner = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
//   if(idUserOwner !== null) {
//     console.log(idUserOwner)
//     //PRECISAMOS MEXER AQUI, PARA QUE QUANDO ELE TIVER LOGADO O QUE ELE PODERA FAZER?
//     var allProject = await project.find().populate("userId") // array de todos os documentos achado
//   }
//   else{ var allProject = await project.find().populate("userId") }//DEFAULT MOSTRAMOS A QUEM PERTENCE O TEXTO
//   res.render("vitrine/vitrine.hbs", {allProject} )
// })


// //Routa que leva a permitir cria o projeto
// router.get("/vitrine/create", (req, res) => { //2
//   res.render("vitrine/vitrine-create.hbs")
// })


// //POST ROUTE
// //pegamos o id do render sucess na rote_login
// router.post("/vitrine/create", async (req, res) => { // 2
//   console.log( color.red(">>> To no vitrine post \n") );
//   if(req.body.text !== "")
//   {
//     req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null//colocamos o id do user para o objeto req.body
//     req.body._id = await createProject(req.body).then((s) => {return s.id})//criando o vitrine e pegando o id do mesmo
//     console.log(req.body)
//     res.render("vitrine/vitrine-owner.hbs", req.body ) //mandamos para o hbs o objeto para manipular
//   } else { res.render("vitrine/vitrine-create.hbs"), { error: "Falha ao criar o post" } }
// })

// //PUT ROUTE (por enquanto usando o get, temos que mudar depois)
// router.get("/vitrine/edit", (req, res) => {
//   console.log( "to na routa get edit vitrine " + req.query.id )
//   res.render("vitrine/vitrine-edit.hbs", {id:req.query.id})
// })

// //Aqui pegamos o id do post e do owner e permitimos editar
// //ROUTE POST
// //Edit
// router.post("/vitrine/edit" , (req, res) => {
//   let idVitrineEdit = req.query.id
//   console.log( "to na routa post edit vitrine " + idVitrineEdit + "\n" + req.body.text)

//   if(idVitrineEdit) {//fazendo update e vendo o resultado novo
//     console.log("banana e sempre bom")
//     project.findByIdAndUpdate(idVitrineEdit, {text: req.body.text})
//     .then((s) => project.findById(idVitrineEdit).then((s)=>console.log("sucesso " + s)).catch((e)=>"error "+ error))
//     .catch((e) => console.log("error " + e))
//   }

//   res.send("edit sucess")
// })

// //delete
// router.post("/vitrine/remove" , (req, res) => {
//   let idVitrineRemove = req.query.id
//   console.log( "to na routa post remove vitrine " + idVitrineRemove)

//   if(idVitrineRemove) {
//     project.findByIdAndRemove(idVitrineRemove)
//     .then((s) => console.log(s))
//     .catch((e) => console.log(e))
//   }

//   res.send("edit sucess")
// })



//FUNCÕES
//Função para cria o tutorial
async function createProject(reqs) {
  let foundProject = project.create(reqs).then((s) => {return s}).catch((e) => console.log(e))
  return foundProject
} 

//GET ROUTE
//Tutorial do visitante, sem permissão de editar
router.get("/vitrine", async (req, res) => { // 1
  console.log( color.red(">>> To no vitrine get \n") )
  //vemos se o usuario ta logado
  let idUserOwner = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  if(idUserOwner !== null) {
    console.log(idUserOwner)
    //PRECISAMOS MEXER AQUI, PARA QUE QUANDO ELE TIVER LOGADO O QUE ELE PODERA FAZER?
    var allProject = await project.find().populate("userId") // array de todos os documentos achado
  }
  else{ var allProject = await project.find().populate("userId") }//DEFAULT MOSTRAMOS A QUEM PERTENCE O TEXTO
  res.render("vitrine/vitrine.hbs", {allProject} )
})

//Routa que leva a permitir cria o tutorial
router.get("/vitrine/create", (req, res) => { //3
  res.render("vitrine/vitrine-create.hbs")
})

//POST
//pegamos o id do render sucess na rote_login
router.post("/vitrine/edit", async(req, res) => { // 2
  console.log( color.red(">>> To no vitrine post edit \n" + req.query.id ) );
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null//colocamos o id do user para o objeto req.body

  // const findProject = await project.findById(idVitrineRemove)
  // const enableEdit = (findProject.userId == req.body.userId)

  if(req.body.text !== "" && req.body.title !== "" )//criando
  {
    if(req.body.userId !== null) { req.body.Project = await createProject(req.body) }//criando o tutorial se ele ta em texto e logado
    res.render("vitrine/vitrine-owner.hbs", req.body) //mandamos para o hbs o objeto para manipular
  } else { //erro
    res.render("vitrine/vitrine-edit.hbs", { error: "Falha ao criar o projeto, preencha os campo corretamente" }) 
  }
})

router.post("/vitrine/create", async(req, res) => {
  console.log( color.red(">>> To no vitrine post create \n" + req.query.id ) );
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null//colocamos o id do user para o objeto req.body
  if(req.body.text !== "" && req.body.title !== "" )//criando
  {
    console.log("ele")
    if(req.body.userId !== null) { req.body.Project = await createProject(req.body) }//criando o tutorial se ele ta em texto e logado
    res.redirect("/vitrine") //mandamos para o hbs o objeto para manipular
  } else { //erro
    res.render("vitrine/vitrine-create.hbs", { error: "Falha ao criar o projeto, preencha os campo corretamente" }) 
  }
})

//AQUI SÓ VEMOS O RESULTADO ESPECIFICO, VINDO DE ALL TUTORIALs
router.post("/vitrine/owner", async (req, res) => { // 2
  console.log( color.red(">>> To no vitrine owner \n" + req.query.id ) );
  req.body.Project = await project.findById(req.query.id).populate("userId")
  res.render("vitrine/vitrine-owner.hbs", req.body) //mandamos para o hbs o objeto para manipular
})

//delete
router.post("/vitrine/remove" , async (req, res) => {
  let idVitrineRemove = req.query.id
  console.log( "to na routa post remove Vitrine " + idVitrineRemove)
  req.body.userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null

  const findProject = await project.findById(idVitrineRemove)
  const enableRemove = (findProject.userId == req.body.userId)

  if(idVitrineRemove && enableRemove) {
    project.findByIdAndRemove(idVitrineRemove)
    .then((s) => console.log(s))
    .catch((e) => console.log(e))
  }

  res.redirect("/vitrine")
})