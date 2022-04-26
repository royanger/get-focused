import { prisma } from '../../../prisma/db'

async function exerciseQuery(date: string, userId: string) {
  await prisma.$connect()
  let exerciseResults = await prisma.exercise.findFirst({
    where: {
      userId: userId,
      dateId: date,
    },
  })

  return exerciseResults
}

export let findExerciseEntries = async (
  date: string,
  userId: string | undefined
) => {
  if (date && userId) {
    let exerciseResults = await exerciseQuery(date, userId)
      .catch(e => {
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return exerciseResults
  } else {
    return null
  }
}
