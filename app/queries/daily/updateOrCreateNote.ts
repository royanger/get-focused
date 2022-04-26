import { prisma } from '../../../prisma/db'

export async function updateOrCreateNote(
  id: string,
  message: string,
  userId: string,
  date: string
) {
  await prisma.$connect()

  let note
  // if there was no wellness entry, create one
  if (id === 'note-new') {
    let note = await prisma.note.create({
      data: {
        note: message,
        userId: userId,
        dateId: date,
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

  let results = await prisma.note
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

  if (!note) {
    throw new Error('failed to create or update note')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated note successfully')
  }
}
