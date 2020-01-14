const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    people(
      query: String!
      resultsPerPage: Int!
      startingPopularity: Int!
    ): [Person]!
    peopleCount(query: String!): Int!
    person(id: ID!): Person
  }

  type Person {
    id: ID!
    name: String!
    profiles: [String]
    image: String
  }

  input PersonInput {
    name: String!
    profiles: [String]
    image: String
  }

  type Mutation {
    createPerson(person: PersonInput!): Person
    editPerson(id: ID!, person: PersonInput!): Person
  }
`

module.exports = typeDefs
