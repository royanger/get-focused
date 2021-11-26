import { db } from '../../prisma/db'

let findWellness = async targetDate => {
  let date = new Date(targetDate)

  let wellness = await db.prisma.wellness.findMany({
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
  return wellness
}
