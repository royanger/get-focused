import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

export default async function findWeeklyWin(date: string, userId: string) {
  async function queryWins(date: string, userId: string) {
    await prisma.$connect()

    const results = await prisma.wins.findFirst({
      where: {
        userId: userId,
      },
    })
    return results
  }

  if (date && userId) {
    const weeklyWins = await queryWins(date, userId)
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
