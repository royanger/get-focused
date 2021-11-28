import { db } from '../../prisma/db'
import { getDate } from '~/libs/getDate'

export let findExercise = async (targetDate, userId) => {
  let date = getDate(targetDate)

  let dateResults = await db.date.findUnique({
    where: {
      date: date,
    },
  })

  let exercise = await db.exercise.findMany({
    where: {
      AND: [{ dateId: dateResults.id }, { userId: userId }],
    },
  })
  return exercise
}
