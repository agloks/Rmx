function parseRefererHeader(headers) {
  let idArticle = headers.referer.match("id=*")
  let idArticleIndex = idArticle.index + 2 //skip (id=)
  let queryIdArticle = ""
  while((idArticleIndex ++< idArticle.input.length) & (idArticle.input[idArticleIndex] !== undefined)) {
    queryIdArticle += idArticle.input[idArticleIndex]
  }
  return queryIdArticle
} 

module.exports = parseRefererHeader