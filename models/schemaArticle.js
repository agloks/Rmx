const mongoose = require("mongoose")
const Schema = mongoose.Schema
const moment = require("moment")

//conexao
// mongoose.connect('mongodb://localhost:27017/rmx', { useNewUrlParser: true, useUnifiedTopology: true  }).then((e) => console.log("Connect Sucess BD"))

//criando esqueleto do documento article
const ArticleSchema = new Schema (
  {
    image: {type: String, default: "https://res.cloudinary.com/rmx/image/upload/v1573594449/user-rmx/green.jpeg.jpg"},
    userId: { type:Schema.Types.ObjectId, ref:"user" },
    title: {type: Schema.Types.Mixed, default: 'No title'},
    text: Schema.Types.Mixed,
    replyes:[ {type:Schema.Types.ObjectId, ref:"comment"} ],
    likes: {type: Number, default: 0},
    time: {type: Date, default: moment.utc("2019-10-06")}
  },
  {timestamps: true}
)

//tests
const TestArticle =
  {
    title: "test",
    text: "sjiaiejifjaeif aefjaeifniae ifae ifaneifae ifneai",
    likes: 2,
    time: moment.utc("2019-10-06")
  }

//adicionando o esquelo no modelo do banco
const article = mongoose.model("article", ArticleSchema)

// article.create(TestArticle).then((e) => console.log(e)).catch((e) => console.log(e))

module.exports = article