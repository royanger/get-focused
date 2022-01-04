import { prisma } from '../../prisma/db'

export default async function findWeeklyImprovements(
  week: string,
  userId: string
) {
  async function queryImprovements(week: string, userId: string) {
    await prisma.$connect()

    const results = await prisma.improvements.findMany({
      where: {
        userId: userId,
        weekId: week,
      },
    })
    return results
  }

  if (week && userId) {
    const weeklyWins = await queryImprovements(week, userId)
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
