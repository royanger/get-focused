import { prisma } from '../../prisma/db'

export default async function findWeeklyImprovements(
  date: string,
  userId: string
) {
  async function queryImprovements(date: string, userId: string) {
    await prisma.$connect()

    const results = await prisma.improvements.findMany({
      where: {
        userId: userId,
      },
    })
    return results
  }

  if (date && userId) {
    const weeklyWins = await queryImprovements(date, userId)
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
