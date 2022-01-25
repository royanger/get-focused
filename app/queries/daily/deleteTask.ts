import { prisma } from '~/../prisma/db'

async function tasksQuery(id: string, userId: string) {
  await prisma.$connect()
  let tasksResults = await prisma.task.findFirst({
    where: {
      userId: userId,
      id: id,
    },
  })

  return tasksResults
}

async function taskDelete(id: string) {
  await prisma.$connect()
  let tasksResults = await prisma.task.delete({
    where: {
      id: id,
    },
  })
  return tasksResults
}

export let deleteTasks = async (id: string, userId: string | undefined) => {
  console.log('main query function')
  if (id && userId) {
    let tasksQueryResults = await tasksQuery(id, userId)
      .catch(e => {
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    if (tasksQueryResults.id) {
      let taskDeleteResults = await taskDelete(tasksQueryResults.id)
        .catch(e => {
          throw new Error(e)
        })
        .finally(async () => {
          await prisma.$disconnect()
        })
      return taskDeleteResults
    }

    throw new Error('Provided task id does not exist in database')
  } else {
    return null
  }
}
