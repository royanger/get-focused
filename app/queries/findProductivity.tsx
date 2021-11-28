import { db } from '../../prisma/db'
import { getDate } from '~/libs/getDate'

export let findProductivity = async (targetDate, userId) => {
  let date = getDate(targetDate)

  let dateResults = await db.date.findUnique({
    where: {
      date: date,
    },
  })

  const productivity = await db.productivity.findMany({
    where: {
      AND: [{ dateId: dateResults.id }, { userId: userId }],
    },
  })
  return productivity
}
