const color = require("chalk")
const router = require("./route_raiz.js")
const util = require("util")
const comment = require("../models/schemaComment.js")

//GET ROUTE - PARA VER OS COMENTARIOS
router.get("/comments", (req, res) => {
  console.log(color.red("To na routa get comments\n"))
  res.render("comments/comment-tutorial.hbs")
})