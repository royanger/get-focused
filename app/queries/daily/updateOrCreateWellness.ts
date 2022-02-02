import { prisma } from '~/../prisma/db'
import { findOrCreateDate } from '~/queries/findOrCreateDate'

export async function updateOrCreateWellness(
  id: string,
  rating: number,
  userId: string
) {
  let dateResults = await findOrCreateDate('today')

  await prisma.$connect()

  let wellness
  // if there was no wellness entry, create one
  if (id === 'new') {
    let wellness = await prisma.wellness.create({
      data: {
        rating: rating,
        userId: userId,
        dateId: dateResults.id,
      },
    })
    return wellness
  } else {
    // update existing entry
    wellness = await prisma.wellness.update({
      where: {
        id: id,
      },
      data: {
        rating: rating,
      },
    })
  }

  let results = await prisma.wellness
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

  if (!wellness) {
    throw new Error('failed to create or update wellness')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated wellness successfully')
  }
}
