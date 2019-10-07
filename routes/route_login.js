const express = require ("express")
const color = require("chalk")

//libs locais
const router = require("./route_raiz.js")
const controlUserReq = require("../models/all.js")
const user = require("../models/schemas.js")

//----------------------------------- CRIANDO ROUTAS GET ------------------------------------

//GET
router.get("/login", (req, res) => {
    console.log( color.red(">>> To no get login \n") )
    res.render("login")
})

//POST
router.post("/login",async (req, res) => {
    //pega a resposta do post
    console.log( req.body )

    const sendControl = await user.find({name:req.body.username})// pegando o objeto usuario no bd
    const userControled = (sendControl.length === 0) ? new controlUserReq("Guess") : new controlUserReq(sendControl[0].role)//passando a role para a classe que controlara o dom
    userControled.setPermission()//setando as permissão que o usuario pode

    if(userControled.PERMISISION[0]){
        //aqui enviamos o cookie para que possamos manipular o dom no front
        res.cookie("Connection",userControled.PERMISISION.join(""),
        {
            maxAge:1000 * 60 * 2,//2 minutos
            httpOnly:false,//permiti que o cookie seja acessivel no front
        }).redirect("/tutorial")
    }
    else {
        res.redirect("/login")
    }
} )

