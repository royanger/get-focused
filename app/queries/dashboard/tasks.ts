import { prisma } from '~/../prisma/db'
import { findOrCreateDate } from '~/queries/findOrCreateDate'

async function tasksByMonth(
  startDate: string,
  endDate: string,
  userId: string
) {
  await prisma.$connect()
  let tasksResults = await prisma.task.findMany({
    where: {
      AND: [
        {
          date: {
            date: {
              lt: endDate,
            },
          },
        },
        {
          date: {
            date: {
              gt: startDate,
            },
          },
        },
        {
          userId: userId,
        },
      ],
    },
  })

  return tasksResults
}

export let findAllTasks = async (
  startDateParam: string,
  endDateParam: string,
  userId: string | undefined
) => {
  if (userId) {
    const regex = /\d\d\d\d-[01]\d-[0123]\d/

    if (!startDateParam.match(regex)) {
      throw new Error('Target date provided was incorrect format')
    }
    const startDate = `${startDateParam}T00:00:00.000Z`

    if (!endDateParam.match(regex)) {
      throw new Error('Target date provided was incorrect format')
    }
    const endDate = `${endDateParam}T00:00:00.000Z`

    const currentDate = new Date()
    let tasksPartial = await tasksByMonth(startDate, currentDate, userId)
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    let tasksAll = await tasksByMonth(startDate, endDate, userId)
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return {
      all: tasksAll,
      partial: tasksPartial,
      allLength: tasksAll.length,
      partialLength: tasksPartial.length,
    }
  } else {
    return null
  }
}
