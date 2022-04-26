import { prisma } from '../../../prisma/db'

export async function updateOrCreateWellness(
  id: string | undefined,
  rating: number,
  userId: string,
  date: string
) {
  await prisma.$connect()

  let wellness
  // if there was no wellness entry, create one
  if (id === 'new') {
    const results = await prisma.wellness.create({
      data: {
        rating: rating,
        userId: userId,
        dateId: date,
      },
    })
    return results
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
