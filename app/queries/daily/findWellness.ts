import { prisma } from '~/../prisma/db'

async function wellnessQuery(date: string, userId: string) {
  await prisma.$connect()
  let wellnessResults = await prisma.wellness.findFirst({
    where: {
      userId: userId,
      dateId: date,
    },
  })
  return wellnessResults
}

export let findWellnessEntries = async (
  date: string,
  userId: string | undefined
) => {
  if (date && userId) {
    let wellnessResults = await wellnessQuery(date, userId)
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return wellnessResults
  } else {
    return null
  }
}
