const color = require("chalk")
const router = require("./route_raiz.js")

//forum
router.get("/forum", (req, res) => {
  console.log( color.red(">>> To no forum / \n") )
  res.render("forum.hbs")
})