const color = require("chalk")
const router = require("./route_raiz.js")
const util = require("util")
const article = require("../models/schemaArticle.js")

async function createArticle(reqs) {
  article.create(reqs).then((s) => console.log(s)).catch((e) => console.log(e))
} 

//tutorial do visitante, sem permissão de editar
router.get("/tutorial", (req, res) => {
  console.log( color.red(">>> To no tutorial get \n") )
  res.render("tutoriais/tutorial.hbs")
})

// router.get("/tutorial/:idArticle", (req, res) => {
//   req.params.idArticle
// })

//pegamos o id do render sucess na rote_login
router.post("/tutorial/:id", async (req, res) => {
  console.log( color.red(">>> To no tutorial post \n") ); console.log( color.blue(`${util.inspect(req.params)}\n`) );
  if(req.body.text !== "")
  {
    req.body.userId = req.params.id
    await createArticle(req.body)
    res.render("tutoriais/tutorial-owner.hbs", req.body)
  } else { res.render("tutoriais/tutorial.hbs"), { error: "Falha ao criar o post" } }
})