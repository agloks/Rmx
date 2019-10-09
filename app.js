const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const express = require("express")()
const cookies = require("cookie-parser")
const http = require("http")//o mais "baixo nivel" para controle de web

//------------------------------ CRIANDO SERVER -----------------------------------------
express.listen(3000)

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true  }).then((e) => console.log("Connect Sucess BD"))

//---------------------------- EXPRESS USE/CONFIGURAÇÃO -------------------------------------
//Aqui dizemos o que o express vai gerenciar:

//Setando engine de render para o express, dando para ele o hbs
express.use(cookies())
express.set("view engine","hbs")
express.set("views", process.cwd() + "/public/views/")
express.use( require("express").static(process.cwd()+"/public/"))
express.use(bodyParser.json())
express.use(bodyParser.urlencoded({extended:true}))

//Setando rota para o express
const router_vitrine = require("./routes/route_vitrine.js")
const router_tutorial = require("./routes/router_tutorial.js")
const router_forum = require("./routes/route_forum.js")
const router_login = require("./routes/route_login.js")
const router_user = require("./routes/route_user.js")
const router_sign = require("./routes/route_sign.js")
const router_raiz = require("./routes/route_raiz.js")
express.use("/",router_raiz)