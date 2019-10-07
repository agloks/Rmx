const mongoose = require("mongoose")
const Schema = mongoose.Schema
const moment = require("moment")

//conexao
// mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true  }).then((e) => console.log("Connect Sucess BD"))

//criando esqueleto do documento article
const ArticleSchema = new Schema (
  {
    userId: Schema.Types.ObjectId,
    title: Schema.Types.Mixed,
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
    // replyes:
    // [{
    //   text: "soamcmcanei fmeaimfao camoe",
    //   timestamps: moment.utc("2019-10-06")
    // }],
    likes: 2,
    time: moment.utc("2019-10-06")
  }

//adicionando o esquelo no modelo do banco
const article = mongoose.model("article", ArticleSchema)

// article.create(TestArticle).then((e) => console.log(e)).catch((e) => console.log(e))

module.exports = article