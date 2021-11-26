import { db } from '../../prisma/db'

let findNotes = async targetDate => {
  let date = new Date(targetDate)

  let notes = await db.prisma.note.findMany({
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
  return notes
}
