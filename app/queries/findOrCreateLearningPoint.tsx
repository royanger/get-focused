import { prisma } from '../../prisma/db'
import { findOrCreateWeek } from './findOrCreateWeek'

export async function updateOrCreateLearningPoint(
  id: string,
  item: string | null,
  userId: string,
  targetDate: string
) {
  let weekResults = await findOrCreateWeek(targetDate)

  await prisma.$connect()

  let learningpoint
  // if there was no win entry, create one
  if (id === 'new-learningpoints') {
    let results = await prisma.learning.create({
      data: {
        item: item,
        userId: userId,
        weekId: weekResults.id,
      },
    })
    return results
  } else {
    // update existing entry
    // weekId won't change, don't update
    learningpoint = await prisma.learning.update({
      where: {
        id: id,
      },
      data: {
        item: item,
      },
    })
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
