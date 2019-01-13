const PeopleDataSource = require('../datasources/people')
const dbClient = require('../../getDbClient')

describe('create person', () => {
  let db

  beforeAll(async () => {
    db = await dbClient.connectAndGetDatabase()
  })

  test('returns an object', async () => {
    const person = {
      name: 'Siobhan Wilson',
      profiles: [
        {
          url: 'https://twitter.com/SiobhanIsBack'
        }
      ]
    }
    const peopleDataSource = new PeopleDataSource(db)
    const actualResponse = await peopleDataSource.createPerson(person)

    // TODO: Find out why expect.stringMatching does not work for _id property.
    const expectedResponse = [{
      name: 'Siobhan Wilson',
      profiles: [
        {
          url: 'https://twitter.com/SiobhanIsBack',
          platform: 'TWITTER'
        }
      ]
    }]
    expect(actualResponse).toMatchObject(expectedResponse)
  })

  afterAll(async () => {
    await dbClient.close()
  })
})
