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

async function taskComplete(id: string, status: boolean) {
  await prisma.$connect()
  let tasksResults = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      completed: status,
    },
  })
  return tasksResults
}

export let completeTaskQuery = async (
  status: boolean,
  id: string,
  userId: string | undefined
) => {
  if (id && userId) {
    let tasksQueryResults = await tasksQuery(id, userId)
      .catch(e => {
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    if (tasksQueryResults?.id) {
      let taskCreateResults = await taskComplete(tasksQueryResults.id, status)
        .catch(e => {
          throw new Error(e)
        })
        .finally(async () => {
          await prisma.$disconnect()
        })
      return taskCreateResults
    }

    throw new Error('Provided task id does not exist in database')
  } else {
    return null
  }
}
