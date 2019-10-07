const color = require("chalk")
const router = require("./route_raiz.js")

//forum
router.get("/vitrine", (req, res) => {
  console.log( color.red(">>> To na vitrine / \n") )
  res.render("vitrine.hbs")
})