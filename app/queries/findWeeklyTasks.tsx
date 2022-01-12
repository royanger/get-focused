import { prisma } from '../../prisma/db'
import { findOrCreateWeek } from './findOrCreateWeek'

export async function findWeeklyTasks(
  year: number,
  week: number,
  userId: string
) {
  console.log('loader started')
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
