import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

export async function updateOrCreateWin(
  id: string,
  item: string | null,
  userId: string
) {
  let dateResults = await findOrCreateDate('today')

  await prisma.$connect()

  let win
  // if there was no win entry, create one
  if (id === 'win-new') {
    let results = await prisma.wins.create({
      data: {
        item: item,
        userId: userId,
        dateId: dateResults.id,
      },
    })
    return results
  } else {
    // update existing entry
    win = await prisma.wins.update({
      where: {
        id: id,
      },
      data: {
        item: item,
        dateId: dateResults.id,
      },
    })
    console.log('results from update', win)
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
