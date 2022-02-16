import { prisma } from '../../../prisma/db'
import { findOrCreateDate } from '../findOrCreateDate'

export async function updateOrCreateExercise(
  id: FormDataEntryValue | null,
  completed: boolean,
  userId: string,
  date?: string
) {
  let dateResults = await findOrCreateDate('today')

  await prisma.$connect()

  //   let exerciseResults
  // if there was no wellness entry, create one
  if (id === 'new') {
    let wellness = await prisma.exercise.create({
      data: {
        completed: completed,
        userId: userId,
        dateId: dateResults.id,
      },
    })
    return wellness
  } else {
    // update existing entry
    await prisma.exercise.update({
      where: {
        id: id,
      },
      data: {
        completed: completed,
      },
    })
  }

  let results = await prisma.exercise
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch(e => {
      throw new Error(e)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  if (!results) {
    throw new Error('failed to create or update exercise')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated exercise successfully')
  }
}
