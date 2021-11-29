import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

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
  targetDate: string,
  userId: string | undefined
) => {
  let dateResults = await findOrCreateDate(targetDate)

  if (dateResults && userId) {
    let wellnessResults = await wellnessQuery(dateResults.id, userId)
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
