import { db } from '../../prisma/db'

let findExercise = async targetDate => {
  let date = new Date(targetDate)

  let exercise = await db.prisma.exercise.findMany({
    where: {
      AND: [
        {
          date: {
            gte: new Date(
              `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            ),
          },
        },
        {
          date: {
            lte: new Date(
              `${date.getFullYear()}-${date.getMonth() + 1}-${
                date.getDate() + 1
              }`
            ),
          },
        },
      ],
    },
  })
  return exercise
}
