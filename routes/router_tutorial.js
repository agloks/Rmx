const color = require("chalk")
const router = require("./route_raiz.js")

//forum
router.get("/tutorial", (req, res) => {
  console.log( color.red(">>> To no tutorial / \n") )
  res.render("tutorial.hbs")
})