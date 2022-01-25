import { prisma } from '~/../prisma/db'

export default async function findLearningPoints(week: string, userId: string) {
  async function queryLearningPoints(week: string, userId: string) {
    await prisma.$connect()

    const results = await prisma.learning.findMany({
      where: {
        userId: userId,
        weekId: week,
      },
    })
    return results
  }

  if (week && userId) {
    const weeklyWins = await queryLearningPoints(week, userId)
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
