export const typeDefs = `

  type User {
      id: ID
      name: String
      email: String!

  }

  type Query {
   # Find all users
   findUsers: [User!]
   # Find a user by their email
   findUserByEmail(email: String): User
  }
`
