import { prisma } from '../../prisma/db'
import { findOrCreateWeek } from './findOrCreateWeek'

export async function updateOrCreateWin(
  id: string,
  item: string | null,
  userId: string,
  targetDate: string
) {
  let weekResults = await findOrCreateWeek(targetDate)

  await prisma.$connect()

  let win
  // if there was no win entry, create one
  if (id === 'win-new') {
    let results = await prisma.wins.create({
      data: {
        item: item,
        userId: userId,
        weekId: weekResults.id,
      },
    })
    return results
  } else {
    // update existing entry
    // week won't change, don't update
    win = await prisma.wins.update({
      where: {
        id: id,
      },
      data: {
        item: item,
      },
    })
  }

  let results = await prisma.wins.findUnique({
    where: {
      id: id,
    },
  })

  if (!win) {
    throw new Error('failed to create or update note')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated note successfully')
  }
}
