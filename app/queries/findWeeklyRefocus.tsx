import { prisma } from '../../prisma/db'

export default async function findWeeklyRefocus(date: string, userId: string) {
  async function queryRefocus(date: string, userId: string) {
    await prisma.$connect()

    const results = await prisma.refocus.findFirst({
      where: {
        userId: userId,
      },
    })
    return results
  }

  if (date && userId) {
    const weeklyWins = await queryRefocus(date, userId)
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
