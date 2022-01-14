import { determineWeek, determineYear } from '~/libs/dateFunctions'
import { prisma } from '../../prisma/db'

import { findOrCreateWeek } from './findOrCreateWeek'

export async function updateOrCreateRefocus(
  id: string,
  item: string | null,
  userId: string
) {
  const year = determineYear()
  const week = determineWeek('today')
  let weekResults = await findOrCreateWeek(year, week)

  await prisma.$connect()

  let refocus
  // if there was no refocus entry, create one
  if (id === 'refocus-new') {
    let results = await prisma.refocus.create({
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
    refocus = await prisma.refocus.update({
      where: {
        id: id,
      },
      data: {
        item: item,
      },
    })
  }

  let results = await prisma.refocus.findUnique({
    where: {
      id: id,
    },
  })

  if (!refocus) {
    throw new Error('failed to create or update note')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated note successfully')
  }
}
