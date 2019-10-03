const express = require('express')

function createExpressServerForStaticContent() {
  const server = express()
  server.use(express.static('../client/build')) // TODO: Only do this if env is not dev.
  return server
}

module.exports = createExpressServerForStaticContent
