const mongoose = require("mongoose")
const Schema = mongoose.Schema
const moment = require("moment")

//conexao
// mongoose.connect('mongodb://localhost:27017/rmx', { useNewUrlParser: true, useUnifiedTopology: true  }).then((e) => console.log("Connect Sucess BD"))

//criando esqueleto do documento usuario
const UserSchema = new Schema (
  {
  image:{type: String, default: "https://res.cloudinary.com/rmx/image/upload/v1573749404/user-rmx/buddypoke_user_default_ootjl4.png"},
  name: String ,
  login: { type:Schema.Types.Mixed, unique: true, required: true } ,
  password: { type: Schema.Types.Mixed, required: true },
  role: String,
  about: { type:Schema.Types.Mixed, default:" "}
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