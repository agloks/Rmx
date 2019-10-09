const color = require("chalk")
const router = require("./route_raiz.js")
const util = require("util")
const comment = require("../models/schemaComment.js")
const article = require("../models/schemaArticle.js")

//GET ROUTE - PARA VER OS COMENTARIOS
// router.get("/comments", async (req, res) => {
//   const articleId = (req.query !== undefined) ? req.query.idArticle : null
//   console.log(color.red("To na routa get comments\n"))
//   if(articleId !== null){
//     var foundComments = await article.findById(articleId).populate("replyes")
//     console.log(foundComments)
//   }
//   res.json(foundComments)
// })

//PARA CRIAR O COMMENTARIO
router.get("/comments-tutorial/view", async (req, res) => {
  const articleId = (req.query !== undefined) ? req.query.id : null
  console.log(color.red("To na routa get comments\n" + req.query.id))
  if(articleId !== null){
    var foundComments = await article.findById(articleId).populate("replyes")
  }
  res.json(foundComments)
})

//PARA CRIAR O COMMENTARIO
router.get("/comments-tutorial/create", async (req, res) => {
  const articleId = (req.query !== undefined) ? req.query.id : null
  console.log(color.red("To na routa get comments\n"))
  if(articleId !== null){
    var foundComments = await article.findById(articleId).populate("replyes")
    console.log(foundComments)
  }
  res.render("comments/comment-tutorial.hbs", foundComments)
})