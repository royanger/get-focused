import { prisma } from '../../../prisma/db'

async function learningPointQuery(id: FormDataEntryValue, userId: string) {
  await prisma.$connect()
  let learningPointResults = await prisma.learning.findFirst({
    where: {
      userId: userId,
      id: id,
    },
  })
  return learningPointResults
}

async function learningPointDelete(id: FormDataEntryValue) {
  await prisma.$connect()
  let learningPointResults = await prisma.learning.delete({
    where: {
      id: id,
    },
  })
  return learningPointResults
}

export let deleteLearningPointQuery = async (
  id: FormDataEntryValue | null,
  userId: string | undefined
) => {
  if (id && userId) {
    let learningPointQueryResults = await learningPointQuery(id, userId)
      .catch(e => {
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    if (learningPointQueryResults?.id) {
      let learningPointDeleteResults = await learningPointDelete(
        learningPointQueryResults.id
      )
        .catch(e => {
          throw new Error(e)
        })
        .finally(async () => {
          await prisma.$disconnect()
        })
      return learningPointDeleteResults
    }

    throw new Error('Provided learning point id does not exist in database')
  } else {
    return null
  }
}
