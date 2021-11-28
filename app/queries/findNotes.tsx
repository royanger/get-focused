import { db } from '../../prisma/db'
import { getDate } from '~/libs/getDate'

export let findNotes = async (targetDate, userId) => {
  let date = getDate(targetDate)

  let dateResults = await db.date.findUnique({
    where: {
      date: date,
    },
  })

  let notes = await db.note.findMany({
    where: {
      AND: [{ dateId: dateResults.id }, { userId: userId }],
    },
  })
  return notes
}
