import { createDateInstance } from '~/libs/dateFunctions'
import { prisma } from '~/../prisma/db'
import { findOrCreateWeek } from '~/queries/findOrCreateWeek'

export async function updateOrCreateImprovement(
  id: string,
  item: string | null,
  userId: string
) {
  const year = createDateInstance('today').year
  const week = createDateInstance('today').weekNumber
  let weekResults = await findOrCreateWeek(year, week)

  await prisma.$connect()

  let improvement
  // if there was no win entry, create one
  if (id === 'new-improvements') {
    let results = await prisma.improvements.create({
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
    improvement = await prisma.improvements.update({
      where: {
        id: id,
      },
      data: {
        item: item,
      },
    })
  }

  let results = await prisma.improvements
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

  if (!improvement) {
    throw new Error('failed to create or update improvement')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated improvement successfully')
  }
}
