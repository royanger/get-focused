import { prisma } from '~/../prisma/db'

async function tasksQuery(id: FormDataEntryValue, userId: string) {
  await prisma.$connect()
  let tasksResults = await prisma.weeklytask.findFirst({
    where: {
      userId: userId,
      id: id,
    },
  })

  return tasksResults
}

async function taskDelete(id: FormDataEntryValue) {
  await prisma.$connect()
  let tasksResults = await prisma.weeklytask.delete({
    where: {
      id: id,
    },
  })
  return tasksResults
}

export let deleteTaskQuery = async (
  id: FormDataEntryValue | null,
  userId: string | undefined
) => {
  if (id && userId) {
    let tasksQueryResults = await tasksQuery(id, userId)
      .catch(e => {
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    if (tasksQueryResults?.id) {
      let taskDeleteResults = await taskDelete(tasksQueryResults.id)
        .catch(e => {
          throw new Error(e)
        })
        .finally(async () => {
          await prisma.$disconnect()
        })
      return taskDeleteResults
    }

    throw new Error('Provided task id does not exist in database')
  } else {
    return null
  }
}
