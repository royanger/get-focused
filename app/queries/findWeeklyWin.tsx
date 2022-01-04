import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

export default async function findWeeklyWin(week: string, userId: string) {
  async function queryWins(week: string, userId: string) {
    await prisma.$connect()

    const results = await prisma.wins.findFirst({
      where: {
        userId: userId,
        weekId: week,
      },
    })
    return results
  }

  if (week && userId) {
    const weeklyWins = await queryWins(week, userId)
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return weeklyWins
  } else {
    return null
  }
}
