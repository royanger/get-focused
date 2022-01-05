import { prisma } from '../../prisma/db'
import { findOrCreateDate } from './findOrCreateDate'

async function noteQuery(date: string, userId: string) {
  await prisma.$connect()
  let noteResults = await prisma.note.findMany({
    where: {
      userId: userId,
      dateId: date,
    },
  })

  return noteResults
}

export let findNotesEntries = async (
  date: string,
  userId: string | undefined
) => {
  if (date && userId) {
    let noteResults = await noteQuery(date, userId)
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return noteResults
  } else {
    return null
  }
}
