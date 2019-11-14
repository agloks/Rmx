const color = require("chalk")
const router = require("./route_raiz.js")
const util = require("util")
const comment = require("../models/schemaComment.js")
const article = require("../models/schemaArticle.js")
const project = require("../models/schemaProject.js")

//PARA VER O COMMENTARIO JSON TUTORIAL
router.get("/comments-tutorial/view", async (req, res) => {
  const articleId = (req.query !== undefined) ? req.query.id : null
  if(articleId !== null){
    var foundComments = await article.findById(articleId).populate("replyes")
  }
  res.json(foundComments)
})

//PARA CRIAR O COMMENTARIO TUTORIAL
router.post("/comments-tutorial/create", async (req, res) => {
  const articleId = (req.query !== undefined) ? req.query.id : null
  req.body.user = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  if(articleId !== null && req.body.user !== null){
    req.body.article = articleId
    const createdComment = await comment.create(req.body)
    const addCommentArticle = await article.findByIdAndUpdate(articleId, {$push: {replyes: createdComment._id} })
  }
  res.redirect(307, req.headers.referer)//código 307 preserva as ordem de requisição e no objeto req.headers.referer temos a url da requisção recebida
})

//---------------------------------- PROJECT ----------------------------------------------------


//PARA VER O COMMENTARIO JSON PROJECT
router.get("/comments-project/view", async (req, res) => {
  const projectId = (req.query !== undefined) ? req.query.id : null
  if(projectId !== null){
    var foundComments = await project.findById(projectId).populate("replyes")
  }
  res.json(foundComments)
})

//PARA CRIAR O COMMENTARIO PROJECT
router.post("/comments-project/create", async (req, res) => {
  const projectId = (req.query !== undefined) ? req.query.id : null
  req.body.user = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : null
  if(projectId !== null && req.body.user !== null){
    req.body.project = projectId
    const createdComment = await comment.create(req.body)
    const addCommentproject = await project.findByIdAndUpdate(projectId, {$push: {replyes: createdComment._id} })
  }
  res.redirect(307, req.headers.referer)//código 307 preserva as ordem de requisição e no objeto req.headers.referer temos a url da requisção recebida
})