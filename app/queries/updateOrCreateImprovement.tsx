import { determineWeek, determineYear } from '~/libs/dateFunctions'
import { prisma } from '../../prisma/db'
import { findOrCreateWeek } from './findOrCreateWeek'

export async function updateOrCreateImprovement(
  id: string,
  item: string | null,
  userId: string
) {
  const year = determineYear()
  const week = determineWeek('today')
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
