module.exports = {
  Query: {
    person: async (_, { id }, { dataSources }) =>
      dataSources.peopleDataSource.getPerson(id),
    people: async (
      _,
      { query, resultsPerPage, startingPopularity },
      { dataSources }
    ) =>
      dataSources.peopleDataSource.getPeople(
        query,
        resultsPerPage,
        startingPopularity
      ),
    peopleCount: async (_, { query }, { dataSources }) =>
      dataSources.peopleDataSource.getPeopleCount(query),
    user: async (_, __, { dataSources, req }) =>
      dataSources.usersDataSource.getUser(req.session.userId)
  },
  Mutation: {
    // TODO: Return a better error if no user
    createPerson: async (_, { person }, { dataSources, req }) =>
      dataSources.peopleDataSource.createPerson(person, req.session.userId),
    editPerson: async (_, { id, person }, { dataSources }) =>
      dataSources.peopleDataSource.editPerson(id, person),
    upsertUser: async (_, { user }, { dataSources }) => {
      const upsertedUser = await dataSources.usersDataSource.upsertUser(user)
      // TODO: Update session object here. Seems a bit wrong for GraphQL to have to care about this auth detail though.
      return upsertedUser
    }
  }
}
