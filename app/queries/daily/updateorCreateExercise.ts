import { prisma } from '../../../prisma/db'
import { findOrCreateDate } from '../findOrCreateDate'

export async function updateOrCreateExercise(
  id: string,
  completed: boolean,
  userId: string
) {
  let dateResults = await findOrCreateDate('today')

  await prisma.$connect()

  let exerciseResults
  // if there was no wellness entry, create one
  if (id === 'new') {
    let wellness = await prisma.exercise.create({
      data: {
        completed: completed,
        userId: userId,
        dateId: dateResults.id,
      },
    })
    return exerciseResults
  } else {
    // update existing entry
    exerciseResults = await prisma.exercise.update({
      where: {
        id: id,
      },
      data: {
        completed: completed,
      },
    })
  }

  let results = await prisma.exercise.findUnique({
    where: {
      id: id,
    },
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
