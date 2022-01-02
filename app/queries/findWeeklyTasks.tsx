import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

export async function findWeeklyTasks(targetDate: string, userId: string) {
  const dateResults = await findOrCreateDate(targetDate)

  async function tasksQuery(date: string, userId: string) {
    await prisma.$connect()
    const results = await prisma.weeklytask.findMany({
      where: {
        userId: userId,
      },
    })
    return results
  }

  if (dateResults && userId) {
    const weeklyTaskResults = await tasksQuery(dateResults.id, userId)
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return weeklyTaskResults
  } else {
    return null
  }
}
