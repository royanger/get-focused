import { prisma } from '../../prisma/db'

export default async function findWeeklyLearningPoints(
  date: string,
  userId: string
) {
  async function queryLearningPoints(date: string, userId: string) {
    await prisma.$connect()

    const results = await prisma.learning.findMany({
      where: {
        userId: userId,
      },
    })
    return results
  }

  if (date && userId) {
    const weeklyWins = await queryLearningPoints(date, userId)
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
