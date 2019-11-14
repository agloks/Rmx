const express = require ("express")

//----------------------------------- CRIANDO ROUTAS GET ------------------------------------
const router = express.Router()

//raiz - HOME
router.get("/", (req, res) => {
  res.render("index.hbs")
})

module.exports = router