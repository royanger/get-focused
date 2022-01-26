import { prisma } from '~/../prisma/db'

export default async function findRefocus(week: string, userId: string) {
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
