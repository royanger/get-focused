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
  targetDate: string,
  userId: string | undefined
) => {
  let dateResults = await findOrCreateDate(targetDate)

  if (dateResults && userId) {
    let noteResults = await noteQuery(dateResults.id, userId)
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
