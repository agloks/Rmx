const color = require("chalk")
const router = require("./route_raiz.js")
const util = require("util")
const article = require("../models/schemaArticle.js")

//tutorial do visitante, sem permissão de editar
router.get("/tutorial", (req, res) => {
  console.log( color.red(">>> To no tutorial get \n") )
  res.render("tutorial.hbs")
})

//pegamos o id do render sucess na rote_login
router.post("/tutorial/:id", (req, res) => {
  console.log( color.red(">>> To no tutorial post \n") ); console.log( color.blue(`${util.inspect(req.params)}\n`) );

  if(req.body.text != "")
  {
    article.create()
  }
})