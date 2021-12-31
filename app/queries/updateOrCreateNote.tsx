import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

export async function updateOrCreateNote(
  id: string,
  message: string,
  userId: string
) {
  let dateResults = await findOrCreateDate('today')

  console.log('query', id, message, userId)

  await prisma.$connect()

  let note
  // if there was no wellness entry, create one
  if (id === 'note-new') {
    let note = await prisma.note.create({
      data: {
        note: message,
        userId: userId,
        dateId: dateResults.id,
      },
    })
    return note
  } else {
    // update existing entry
    note = await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        note: message,
      },
    })
  }

  let results = await prisma.note.findUnique({
    where: {
      id: id,
    },
  })

  if (!note) {
    throw new Error('failed to create or update note')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated note successfully')
  }
}
