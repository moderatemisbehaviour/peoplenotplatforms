require('dotenv').config({ path: '../.env' })

const createExpressServerForStaticContent = require('./createExpressServerForStaticContent')
const dbClient = require('./getDbClient')
const applyApolloServerMiddleware = require('./applyApolloServerMiddleware')

const expressServer = createExpressServerForStaticContent()
dbClient.connectAndGetDatabase().then((db) => {
  const apolloServer = applyApolloServerMiddleware(expressServer, db)

  const port = process.env.PORT || 4000
  expressServer.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
  )
})
