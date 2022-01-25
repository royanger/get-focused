import { prisma } from '~/../prisma/db'
import { findOrCreateDate } from '~/queries/findOrCreateDate'

export async function updateOrCreateTask(
  id: string,
  taskname: string,
  goalTime: string,
  actualTime: string,
  type: string,
  userId: string,
  completed: boolean
) {
  let dateResults = await findOrCreateDate('today')

  await prisma.$connect()

  let task
  // if there was no wellness entry, create one
  if (id === 'newtask-p1' || id === 'newtask-p2' || id === 'newtask-p3') {
    let task = await prisma.task.create({
      data: {
        name: taskname,
        userId: userId,
        goalTime: goalTime,
        actualTime: actualTime,
        timeTracker: 3,
        statusId: `status-${type}`,
        completed: false,
        dateId: dateResults.id,
      },
    })
    return task
  } else {
    // update existing entry
    task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        name: taskname,
        userId: userId,
        goalTime: goalTime,
        actualTime: actualTime,
        timeTracker: 3,
        statusId: `status-${type}`,
        completed: completed,
      },
    })
  }

  let results = await prisma.task.findUnique({
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
