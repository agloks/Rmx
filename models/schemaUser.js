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

//adicionando o esquelo no modelo do banco
const user = mongoose.model("user", UserSchema)

//testes
const TestUser = {
  name:"test",
  login:"test",
  password:"test",
  role:"MOD"
}

// user.create(TestUser).then((e) => console.log(e)).catch((e) => console.log(e))

module.exports = user