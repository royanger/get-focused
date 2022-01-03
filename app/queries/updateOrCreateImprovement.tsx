import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

export async function updateOrCreateImprovement(
  id: string,
  item: string | null,
  userId: string
) {
  let dateResults = await findOrCreateDate('today')

  await prisma.$connect()

  let improvement
  // if there was no win entry, create one
  if (id === 'new-improvements') {
    let results = await prisma.improvements.create({
      data: {
        item: item,
        userId: userId,
        dateId: dateResults.id,
      },
    })
    return results
  } else {
    // update existing entry
    improvement = await prisma.improvements.update({
      where: {
        id: id,
      },
      data: {
        item: item,
        dateId: dateResults.id,
      },
    })
    console.log('results from update', improvement)
  }

  let results = await prisma.improvements.findUnique({
    where: {
      id: id,
    },
  })

  if (!improvement) {
    throw new Error('failed to create or update improvement')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated improvement successfully')
  }
}
