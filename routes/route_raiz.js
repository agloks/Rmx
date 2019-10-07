const express = require ("express")
const color = require("chalk")

//----------------------------------- CRIANDO ROUTAS GET ------------------------------------
const router = express.Router()

//raiz
router.get("/", (req, res) => {
  console.log( color.red(">>> To no get / \n") )
  res.render("index.hbs")
})

module.exports = router