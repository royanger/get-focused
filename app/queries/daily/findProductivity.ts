import { prisma } from '../../../prisma/db'

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
  date: string,
  userId: string | undefined
) => {
  if (date && userId) {
    let productivityResults = await productivityQuery(date, userId)
      .catch(e => {
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return productivityResults
  } else {
    return null
  }
}
