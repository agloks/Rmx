function userIsLogged(req) {
  const userId = (req.cookies.Connection !== undefined) ? req.cookies.Connection.id : false//colocamos o id do user para o objeto req.body
  return userId 
}

module.exports = userIsLogged