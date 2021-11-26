import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './typeDefs.js'
import { resolvers } from './resolvers.js'

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
