// import pkg from 'express-graphql'
// const { graphqlHTTP } = pkg
// import pkg from 'express-graphql'
import { graphqlHTTP } from 'express-graphql'
import { db } from '../../prisma/db'
import { schema } from '~/graphql/schema'

export function loader({}) {
  return 'Graqhql endpoint'
}

export let action = async ({ params }) => {
  let testing = await graphqlHTTP({
    schema: schema,
    context: db,
    graphiql: true,
  })

  console.log('testing', testing)

  //   return { test: 'this is a test' }
  return testing
}
