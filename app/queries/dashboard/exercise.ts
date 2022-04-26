import { prisma } from '../../../prisma/db'

async function exerciseQuery(userId: string) {
  await prisma.$connect()
  let exerciseResults = await prisma.exercise.findMany({
    where: {
      userId: userId,
    },
  })

  return exerciseResults
}

export let findAllExerciseEntries = async (userId: string | undefined) => {
  if (userId) {
    let exerciseResults = await exerciseQuery(userId)
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
