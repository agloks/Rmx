const express = require("express")
const color = require("chalk")
const bcrypt = require("bcrypt")
const router = require("./route_raiz.js")
const controlUserReq = require("../models/all.js")
const user = require("../models/schemaUser.js")

//GET ROUTE
router.get("/login", (req, res) => {
    res.render("login&&sign/login")
})

//POST ROUTE
router.post("/login/post", async (req, res) => {

    const sendControl = await user.find({ login: req.body.login })
    const userControled = (sendControl.length === 0) ? new controlUserReq("Guess") : new controlUserReq(sendControl[0].role)//passando a role para a classe que controlara o dom
    userControled.setPermission()//setando as permissão que o usuario pode

    if (userControled.PERMISISION[0] && bcrypt.compareSync(req.body.password, sendControl[0].password)) {
        //aqui enviamos o cookie para que possamos manipular o dom no front, e seu id para usamos em outras routas
        let send = { permission: userControled.PERMISISION.join(""), id: sendControl[0]._id }
        res.cookie("Connection", send,
            {
                maxAge: 1000 * 60 * (60 * 24),//60 minutos * 24h
                httpOnly: false,//permiti que o cookie seja acessivel no front
            }).redirect("/user-profile")
    } else {
        res.redirect("/login")
    }
})
