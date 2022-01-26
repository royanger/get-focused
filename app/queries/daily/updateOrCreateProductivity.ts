import { prisma } from '~/../prisma/db'
import { findOrCreateDate } from '~/queries/findOrCreateDate'

export async function updateOrCreateProductivity(
  id: string,
  score: string,
  userId: string
) {
  let dateResults = await findOrCreateDate('today')

  await prisma.$connect()

  let productivity
  // if there was no wellness entry, create one
  if (id === 'new') {
    let productivity = await prisma.productivity.create({
      data: {
        score: parseInt(score),
        userId: userId,
        dateId: dateResults.id,
      },
    })
    return productivity
  } else {
    // update existing entry
    productivity = await prisma.productivity.update({
      where: {
        id: id,
      },
      data: {
        score: parseInt(score),
      },
    })
  }

  let results = await prisma.productivity
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch(e => {
      throw new Error(e)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  if (!productivity) {
    throw new Error('failed to create or update note')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated note successfully')
  }
}
