import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

async function productivityQuery(date: string, userId: string) {
  await prisma.$connect()
  let productivityResults = await prisma.productivity.findFirst({
    where: {
      userId: userId,
      dateId: date,
    },
  })

  return productivityResults
}

export let findProductivityEntries = async (
  targetDate: string,
  userId: string | undefined
) => {
  let dateResults = await findOrCreateDate(targetDate)

  if (dateResults && userId) {
    let productivityResults = await productivityQuery(dateResults.id, userId)
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return productivityResults
  } else {
    return null
  }
}
