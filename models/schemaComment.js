const mongoose = require("mongoose")
const Schema = mongoose.Schema
const moment = require("moment")

//conexao
// mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true  }).then((e) => console.log("Connect Sucess BD"))

//criando esqueleto do documento comentário
const CommentSchema = new Schema (
  {
    text: String,
    user: { type: Schema.Types.ObjectId, ref:"user" },
    article: { type: Schema.Types.ObjectId, ref:"article" },
    likes: { type: Number, default: 0 }
  }
)


//adicionando o esquelo no modelo do banco
const comment = mongoose.model("comment", CommentSchema)

// article.create(TestArticle).then((e) => console.log(e)).catch((e) => console.log(e))

module.exports = comment