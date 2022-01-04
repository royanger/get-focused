import { prisma } from '../../prisma/db'
import { determineWeek } from '~/libs/determineWeek'

export let findOrCreateWeek = async (targetDate: string) => {
  const week = determineWeek(targetDate)

  // query to see if week entry exists
  async function weekQuery(week: number) {
    await prisma.$connect()
    return await prisma.week.findFirst({
      where: {
        week: week,
      },
    })
  }

  // query to create weekentry
  async function createWeekEntry(week: number) {
    await prisma
    return await prisma.week.create({
      data: {
        week: week,
      },
    })
  }

  // check if Week exists after above query/create
  let results = await weekQuery(week)
    .catch(e => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  // if week doesn't exist, create a new entry and return data
  if (!results) {
    let newWeekResults = await createWeekEntry(week)
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })
    return newWeekResults
  }

  // if date did exist, return that data
  return results
}
