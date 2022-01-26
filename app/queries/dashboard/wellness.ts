import { prisma } from '~/../prisma/db'

async function wellnessQuery(userId: string) {
  await prisma.$connect()
  let wellnessResults = await prisma.wellness.findMany({
    where: {
      userId: userId,
    },
  })
  return wellnessResults
}

export let findAllWellnessEntries = async (userId: string | undefined) => {
  if (userId) {
    let wellnessResults = await wellnessQuery(userId)
      .catch(e => {
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return wellnessResults
  } else {
    return null
  }
}
