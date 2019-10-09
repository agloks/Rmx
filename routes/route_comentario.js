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

//PARA VER O COMMENTARIO JSON
router.get("/comments-tutorial/view", async (req, res) => {
  const articleId = (req.query !== undefined) ? req.query.id : null
  console.log(color.red("To na routa get comments\n" + req.query.id))
  if(articleId !== null){
    var foundComments = await article.findById(articleId).populate("replyes")
  }
  res.json(foundComments)
})

//PARA CRIAR O COMMENTARIO
router.post("/comments-tutorial/create", async (req, res) => {
  const articleId = (req.query !== undefined) ? req.query.id : null
  req.body.user = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  console.log(color.red("To na routa post create comments\n"))
  if(articleId !== null && req.body.user !== null){
    req.body.article = articleId
    const createdComment = await comment.create(req.body)
    const addCommentArticle = await article.findByIdAndUpdate(articleId, {$push: {replyes: createdComment._id} })
    console.log(createdComment)
  }
  res.redirect(307, req.headers.referer)//código 307 preserva as ordem de requisição e no objeto req.headers.referer temos a url da requisção recebida
})