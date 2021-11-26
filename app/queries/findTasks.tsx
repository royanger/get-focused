import { db } from '../../prisma/db'

let findTasks = async targetDate => {
  let date = new Date(targetDate)

  let dailyTasks = await db.prisma.task.findMany({
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
  return dailyTasks
}
