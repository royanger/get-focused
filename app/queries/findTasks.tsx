import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

async function tasksQuery(date: string, userId: string) {
  await prisma.$connect()
  let tasksResults = await prisma.task.findFirst({
    where: {
      userId: userId,
      dateId: date,
    },
  })

  return tasksResults
}

export let findTasksEntries = async (
  targetDate: string,
  userId: string | undefined
) => {
  let dateResults = await findOrCreateDate(targetDate)

  if (dateResults && userId) {
    let tasksResults = await tasksQuery(dateResults.id, userId)
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
