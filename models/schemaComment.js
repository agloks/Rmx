const mongoose = require("mongoose")
const Schema = mongoose.Schema
const moment = require("moment")

//conexao
// mongoose.connect('mongodb://localhost:27017/rmx', { useNewUrlParser: true, useUnifiedTopology: true  }).then((e) => console.log("Connect Sucess BD"))

//criando esqueleto do documento comentário
const CommentSchema = new Schema (
  {
    text: String,
    user: { type: Schema.Types.ObjectId, ref:"user" },
    article: { type: Schema.Types.ObjectId, ref:"article" },
    project: {type: Schema.Types.ObjectId, ref:"projects"},
    likes: { type: Number, default: 0 }
  }
)


//adicionando o esquelo no modelo do banco
const comment = mongoose.model("comment", CommentSchema)

// comment.create({text:"Criado comment de ngm"}).then((e) => console.log(e)).catch((e) => console.log(e))

module.exports = comment