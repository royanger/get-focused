import { db } from '../../prisma/db'
import { getDate } from '~/libs/getDate'

export let findTasks = async (targetDate, userId) => {
  let date = getDate(targetDate)

  let dateResults = await db.date.findUnique({
    where: {
      date: date,
    },
  })

  let dailyTasks = await db.task.findMany({
    where: {
      AND: [{ dateId: dateResults.id }, { userId: userId }],
    },
  })
  return dailyTasks
}
