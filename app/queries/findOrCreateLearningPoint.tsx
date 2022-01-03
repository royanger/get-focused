import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

export async function updateOrCreateLearningPoint(
  id: string,
  item: string | null,
  userId: string
) {
  let dateResults = await findOrCreateDate('today')

  console.log('id', id, 'item', item, 'userid', userId)

  await prisma.$connect()

  let learningpoint
  // if there was no win entry, create one
  if (id === 'new-learningpoints') {
    let results = await prisma.learning.create({
      data: {
        item: item,
        userId: userId,
        dateId: dateResults.id,
      },
    })
    return results
  } else {
    // update existing entry
    learningpoint = await prisma.learning.update({
      where: {
        id: id,
      },
      data: {
        item: item,
        dateId: dateResults.id,
      },
    })
    console.log('results from update', learningpoint)
  }

  let results = await prisma.learning.findUnique({
    where: {
      id: id,
    },
  })

  if (!learningpoint) {
    throw new Error('failed to create or update learning point')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated learning point successfully')
  }
}
