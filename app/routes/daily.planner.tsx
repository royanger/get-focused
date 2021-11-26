import { useLoaderData } from 'remix'
import { db } from '../../prisma/db'
import Container from '~/components/container'
import Button from '~/components/button'
import { HeaderOne, HeaderTwo } from '~/components/headlines'
import { findUsers } from '~/graphql/queries/userQueries'
import { schema } from '~/graphql/schema'
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  buildSchema,
} from 'graphql'
import { typeDefs } from '~/graphql/typeDefs'
import { resolvers } from '~/graphql/resolvers.js'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export let loader = async () => {
  // TODO All of these queries need to be cleaned up.
  // Maybe use Graphql, have a Model that stores an entry for each data where something happened (task, exercise, wellness, productivity, note)
  // Key all other Models off that + user

  //   let testing = await findUsers()
  //   console.log('test', testing)

  //   var schema = new GraphQLSchema({
  //    query: new GraphQLObjectType({
  //      name: 'RootQueryType',
  //      fields: {
  //        hello: {
  //          type: GraphQLString,
  //          resolve() {
  //            return 'world';
  //          },
  //        },
  //      },
  //    }),
  //  });

  // if I get this working I would need to create this for each query
  // no big deal
  var schema = buildSchema(`

  type Query {
   # Find a user by their email
   email: String
  }
`)

  var root = {
    email: () => {
      return 'Hello world!'
    },
  }

  let root2 = {
    //  findUserByEmail: (_parent, args, context) => {
    email: async () => {
      let query = await prisma.user.findUnique({
        where: {
          email: 'royanger@gmailcom',
        },
      })
      console.log('query', query)
      return query
    },
    //  },
  }

  graphql(schema, '{ email }', root2).then(response => {
    console.log(response)
  })
  //   let testing = await graphql(typeDefs, '', resolvers)
  //   console.log('loader test', testing)

  //   graphqlHTTP({
  //    schema: schema,
  //    context: db,
  //    graphiql: true,
  //  })

  //   const date = new Date()
  //   const dailyTasks = await db.prisma.task.findMany({
  //     where: {
  //       AND: [
  //         {
  //           date: {
  //             gte: new Date(
  //               `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  //             ),
  //           },
  //         },
  //         {
  //           date: {
  //             lte: new Date(
  //               `${date.getFullYear()}-${date.getMonth() + 1}-${
  //                 date.getDate() + 1
  //               }`
  //             ),
  //           },
  //         },
  //       ],
  //     },
  //   })
  //   const wellness = await db.prisma.wellness.findMany({
  //     where: {
  //       AND: [
  //         {
  //           date: {
  //             gte: new Date(
  //               `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  //             ),
  //           },
  //         },
  //         {
  //           date: {
  //             lte: new Date(
  //               `${date.getFullYear()}-${date.getMonth() + 1}-${
  //                 date.getDate() + 1
  //               }`
  //             ),
  //           },
  //         },
  //       ],
  //     },
  //   })
  //   const exercise = await db.prisma.exercise.findMany({
  //     where: {
  //       AND: [
  //         {
  //           date: {
  //             gte: new Date(
  //               `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  //             ),
  //           },
  //         },
  //         {
  //           date: {
  //             lte: new Date(
  //               `${date.getFullYear()}-${date.getMonth() + 1}-${
  //                 date.getDate() + 1
  //               }`
  //             ),
  //           },
  //         },
  //       ],
  //     },
  //   })
  //   const notes = await db.prisma.note.findMany({
  //     where: {
  //       AND: [
  //         {
  //           date: {
  //             gte: new Date(
  //               `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  //             ),
  //           },
  //         },
  //         {
  //           date: {
  //             lte: new Date(
  //               `${date.getFullYear()}-${date.getMonth() + 1}-${
  //                 date.getDate() + 1
  //               }`
  //             ),
  //           },
  //         },
  //       ],
  //     },
  //   })
  //   const productivity = await db.prisma.productivity.findMany({
  //     where: {
  //       AND: [
  //         {
  //           date: {
  //             gte: new Date(
  //               `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  //             ),
  //           },
  //         },
  //         {
  //           date: {
  //             lte: new Date(
  //               `${date.getFullYear()}-${date.getMonth() + 1}-${
  //                 date.getDate() + 1
  //               }`
  //             ),
  //           },
  //         },
  //       ],
  //     },
  //   })
  //   return {
  //     tasks: dailyTasks,
  //     wellness: wellness,
  //     exercise: exercise,
  //     notes: notes,
  //     productivity: productivity,
  //   }
  return 'test'
}

export default function DailyPlanner() {
  let data = useLoaderData()
  //   console.log(data)
  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Daily Planner</HeaderOne>

          <HeaderTwo>How do you feel?</HeaderTwo>
          <p>Rate how you are feeling out of 10.</p>
          {/* <p>From DB: {data?.wellness && data.wellness[0]?.rating}</p> */}
          <div className="flex-shrink flex">
            <div className="grid grid-cols-10 mb-6">
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>

              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>

          <HeaderTwo>Did you exercise today?</HeaderTwo>
          {/* <p>From DB: {data?.exercise[0]?.completed ? 'true' : 'false'}</p> */}

          <div>
            <input type="checkbox" /> Yes
          </div>
          <div>
            <input type="checkbox" /> No
          </div>

          <HeaderTwo>What is your most important goal(s) today?</HeaderTwo>
          <p>Try to focus on one goal, but you can focus on a few.</p>

          {/* <p>From DB: {data?.tasks && data.tasks[0]?.name}</p> */}
          {/* <p>From DB: {data?.task[1]?.name && data.task[1].name}</p> */}

          <div>
            <div className="flex flex-row items-center">
              <div className="flex-grow flex">
                <input
                  className="border-2 border-purple p-2 text-black rounded flex-grow"
                  type="text"
                  placeholder="Important Goals"
                  aria-label="Important Goals"
                />
              </div>
              <div className="w-8 flex flex-row justify-center ">
                <input type="checkbox" />
              </div>
              <div className="w-32 flex flex-row justify-center ">
                <div className="flex-grow justify-center items-center flex ">
                  <input type="radio" />
                </div>
                <div className="flex-grow justify-center items-center flex ">
                  <input type="radio" />
                </div>
                <div className="flex-grow justify-center items-center flex ">
                  <input type="radio" />
                </div>
                <div className="flex-grow justify-center items-center flex ">
                  <input type="radio" />
                </div>
                <div className="flex-grow justify-center items-center flex ">
                  <input type="radio" />
                </div>
              </div>
              <div className="w-8 flex flex-row justify-center ">
                <input type="checkbox" />
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="flex-grow"></div>
              <div className="text-xs w-8 flex flex-row justify-center ">
                Target
              </div>
              <div className="text-xs w-32 flex flex-row justify-center ">
                Track your time
              </div>
              <div className="text-xs w-8 flex flex-row justify-center ">
                Actual
              </div>
            </div>
          </div>

          <Button title="Save" />

          <Button title="Cancel" variant="cancel" />

          <HeaderTwo>Important Goals and Tasks</HeaderTwo>
          <p>
            These tasks and goals are secondary to your most important goal, but
            are things you really want to finish today.
          </p>

          <HeaderTwo>Bonus Goals and Tasks</HeaderTwo>
          <p>
            If you finish all of the above tasks and goals, what are some tasks
            that would be awesome to finish today?
          </p>

          <HeaderTwo>Notes</HeaderTwo>
          <p>
            Jot down any notes. These will be shown on the Weekly Review and can
            be accessed through your dashboard.
          </p>
          <input
            type="textarea"
            className="w-full h-36 border-2 border-purple rounded"
          />
          <Button title="Save" />

          <Button title="Cancel" variant="cancel" />

          <HeaderTwo>Productivity Score?</HeaderTwo>
          <p>Rate how you productive you felt out of 10.</p>
          {/* <p>From DB: {data?.productivity && data.productivity[0]?.score}</p> */}
          <div className="flex-shrink flex">
            <div className="grid grid-cols-10 mb-6">
              <div>
                <input className="mx-2" type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>
                <input type="radio" />
              </div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
