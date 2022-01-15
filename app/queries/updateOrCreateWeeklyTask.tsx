import { determineWeek, determineYear } from '~/libs/dateFunctions'
import { prisma } from '../../prisma/db'
import { findOrCreateWeek } from './findOrCreateWeek'

export async function updateOrCreateWeeklyTask(
  id: string,
  taskName: string,
  completed: boolean,
  status: string,
  userId: string
) {
  const year = determineYear()
  const week = determineWeek('today')

  const weekResults = await findOrCreateWeek(year, week)

  await prisma.$connect()

  let task

  if (id === 'newtask-p1' || id === 'newtask-p2' || id === 'newtask-p3') {
    // create new weekly task
    let task = await prisma.weeklytask.create({
      data: {
        task: taskName,
        userId: userId,
        completed: completed,
        statusId: status,
        weekId: weekResults.id,
      },
    })
    return task
  } else {
    // update existing weekly task
    // weekId won't change
    task = await prisma.weeklytask.update({
      where: {
        id: id,
      },
      data: {
        task: taskName,
        userId: userId,
        completed: completed,
        statusId: status,
      },
    })
  }

  let results = await prisma.weeklytask.findUnique({
    where: {
      id: id,
    },
  })

  if (!task) {
    throw new Error('failed to create or update task')
  }

  if (results) {
    return results
  } else {
    throw new Error('failed to query new/updated task successfully')
  }
}
