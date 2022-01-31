import { createDateInstance } from '~/libs/dateFunctions'
import { prisma } from '~/../prisma/db'
import { findOrCreateWeek } from '~/queries/findOrCreateWeek'

export async function updateOrCreateLearningPoint(
  id: string,
  item: string | null,
  userId: string
) {
  const year = createDateInstance('today').year
  const week = createDateInstance('today').weekNumber
  let weekResults = await findOrCreateWeek(year, week)

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

  let results = await prisma.learning
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

  if (!learningpoint) {
    throw new Error('failed to create or update learning point')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated learning point successfully')
  }
}
