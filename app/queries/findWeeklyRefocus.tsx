import { prisma } from '../../prisma/db'

export default async function findWeeklyRefocus(week: string, userId: string) {
  async function queryRefocus(week: string, userId: string) {
    await prisma.$connect()

    const results = await prisma.refocus.findFirst({
      where: {
        userId: userId,
      },
    })
    return results
  }

  if (week && userId) {
    const weeklyWins = await queryRefocus(week, userId)
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
