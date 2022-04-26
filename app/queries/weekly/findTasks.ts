import { prisma } from '../../../prisma/db'
import { findOrCreateWeek } from '../../queries/findOrCreateWeek'

export async function findTasks(year: number, week: number, userId: string) {
  const weekResults = await findOrCreateWeek(year, week)

  async function tasksQuery(date: string, userId: string) {
    await prisma.$connect()
    const results = await prisma.weeklytask.findMany({
      where: {
        userId: userId,
        weekId: weekResults.id,
      },
    })
    return results
  }

  if (weekResults && userId) {
    const weeklyTaskResults = await tasksQuery(weekResults.id, userId)
      .catch(e => {
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return weeklyTaskResults
  } else {
    return null
  }
}
