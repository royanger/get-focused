import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

export async function updateOrCreateRefocus(
  id: string,
  item: string | null,
  userId: string
) {
  let dateResults = await findOrCreateDate('today')

  await prisma.$connect()

  let refocus
  // if there was no refocus entry, create one
  if (id === 'refocus-new') {
    let results = await prisma.refocus.create({
      data: {
        item: item,
        userId: userId,
        dateId: dateResults.id,
      },
    })
    return results
  } else {
    // update existing entry
    refocus = await prisma.refocus.update({
      where: {
        id: id,
      },
      data: {
        item: item,
        dateId: dateResults.id,
      },
    })
    console.log('results from update', refocus)
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
