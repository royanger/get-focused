import { prisma } from '../../../prisma/db'

async function improvementsQuery(id: FormDataEntryValue, userId: string) {
  await prisma.$connect()
  let improvementResults = await prisma.improvements.findFirst({
    where: {
      userId: userId,
      id: id as string,
    },
  })
  return improvementResults
}

async function improvementDelete(id: FormDataEntryValue) {
  await prisma.$connect()
  let improvementResults = await prisma.improvements.delete({
    where: {
      id: id as string,
    },
  })
  return improvementResults
}

export let deleteImprovementQuery = async (
  id: FormDataEntryValue | null,
  userId: string | undefined
) => {
  if (id && userId) {
    let improvementsQueryResults = await improvementsQuery(id, userId)
      .catch(e => {
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    if (improvementsQueryResults?.id) {
      let improvementDeleteResults = await improvementDelete(
        improvementsQueryResults.id
      )
        .catch(e => {
          throw new Error(e)
        })
        .finally(async () => {
          await prisma.$disconnect()
        })
      return improvementDeleteResults
    }

    throw new Error('Provided improvement id does not exist in database')
  } else {
    return null
  }
}
