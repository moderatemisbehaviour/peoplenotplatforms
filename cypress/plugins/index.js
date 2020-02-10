// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const resetDatabase = require('../../database/src/resetDatabase')
const DatabaseClient = require('../../database/src/DatabaseClient')
const fs = require('fs')
const createPeople = require('./createPeople')

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const databaseClient = new DatabaseClient(process.env.MONGODB_URI)
  await databaseClient.connect()
  const peopleCollection = databaseClient.db.collection('people')

  on('task', {
    async resetDatabase() {
      await resetDatabase()
      return null // Tell Cypress we do not intend to yield a value.
    },
    async createPerson(fixture) {
      if (!fixture) {
        const siobhan = JSON.parse(
          fs.readFileSync('cypress/fixtures/siobhan.json', 'utf8')
        )
        siobhan.popularity = 1
        fixture = siobhan
      }

      const result = await peopleCollection.insertOne(fixture)
      const person = result.ops[0]

      return person
    },
    async createPeople() {
      return createPeople(databaseClient)
    }
  })

  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      args.push('--remote-debugging-port=9222')
      return args
    }
  })

  return config
}
