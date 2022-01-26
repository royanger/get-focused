import { prisma } from '../../../prisma/db'

export default async function findWin(week: string, userId: string) {
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
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return weeklyWins
  } else {
    return null
  }
}
