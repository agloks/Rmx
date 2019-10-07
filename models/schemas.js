const mongoose = require("mongoose")
const Schema = mongoose.Schema
const moment = require("moment")

//conexao
// mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true  }).then((e) => console.log("Connect Sucess BD"))

//criando esqueleto do documento usuario
const UserSchema = new Schema (
  {
  name: String ,
  login: { type:Schema.Types.Mixed, unique: true, required: true } ,
  password: { type: Schema.Types.Mixed, required: true },
  role: String
  },
  { timestamps:true }
)

//criando esqueleto do documento article
const ArticleSchema = new Schema (
  {
    title: Schema.Types.Mixed,
    text: Schema.Types.Mixed,
    replyes:
    [{
      user: { type: Schema.Types.ObjectId, ref: 'user' },
      text: Schema.Types.Mixed,
      timestamps: {type: Date, default: moment.utc("2019-10-06")}
    }],
    likes: Number,
    time: {type: Date, default: moment.utc("2019-10-06")}
  },
  {timestamps: true}
) 

//adicionando o esquelo no modelo do banco
const user = mongoose.model("user", UserSchema)
const article = mongoose.model("article", ArticleSchema)

//testes
const TestUser = {
  name:"test",
  login:"test",
  password:"test",
  role:"MOD"
}

const TestArticle =
  {
    title: "test",
    text: "sjiaiejifjaeif aefjaeifniae ifae ifaneifae ifneai",
    replyes:
    [{
      text: "soamcmcanei fmeaimfao camoe",
      timestamps: moment.utc("2019-10-06")
    }],
    likes: 2,
    time: moment.utc("2019-10-06")
  }


// article.create(TestArticle).then((e) => console.log(e)).catch((e) => console.log(e))
// user.create(TestUser).then((e) => console.log(e)).catch((e) => console.log(e))

module.exports = user