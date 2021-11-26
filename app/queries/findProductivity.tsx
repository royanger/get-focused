import { db } from '../../prisma/db'

let findProductivity = async targetDate => {
  let date = new Date(targetDate)

  const productivity = await db.prisma.productivity.findMany({
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
  return productivity
}
