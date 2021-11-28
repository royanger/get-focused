import { db } from '../../prisma/db'
import { getDate } from '~/libs/getDate'

export let findWellness = async (targetDate, userId) => {
  let date = getDate(targetDate)

  console.log(date)
  let dateResults = await db.date.findUnique({
    where: {
      date: date,
    },
  })

  let wellness = await db.wellness.findMany({
    where: {
      AND: [{ dateId: dateResults.id }, { userId: userId }],
    },
  })
  return wellness
}
