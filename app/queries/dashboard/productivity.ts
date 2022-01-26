import { prisma } from '~/../prisma/db'

async function productivityQuery(userId: string) {
  await prisma.$connect()
  let productivityResults = await prisma.productivity.findMany({
    where: {
      userId: userId,
    },
  })

  return productivityResults
}

export let findAllProductivityEntries = async (userId: string | undefined) => {
  if (userId) {
    let productivityResults = await productivityQuery(userId)
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
