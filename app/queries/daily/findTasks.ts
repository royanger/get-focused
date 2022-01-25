import { prisma } from '../../../prisma/db'

async function tasksQuery(date: string, userId: string) {
  await prisma.$connect()
  let tasksResults = await prisma.task.findMany({
    where: {
      userId: userId,
      dateId: date,
    },
  })

  return tasksResults
}

export let findTasksEntries = async (
  date: string,
  userId: string | undefined
) => {
  if (date && userId) {
    let tasksResults = await tasksQuery(date, userId)
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return tasksResults
  } else {
    return null
  }
}
