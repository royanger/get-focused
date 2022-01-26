import { prisma } from '../../prisma/db'

export let findOrCreateWeek = async (year: number, week: number) => {
  // query to see if week entry exists
  async function weekQuery(year: number, week: number) {
    await prisma.$connect()
    return await prisma.week.findFirst({
      where: {
        week: week,
        year: year,
      },
    })
  }

  // query to create weekentry
  async function createWeekEntry(year: number, week: number) {
    await prisma
    return await prisma.week.create({
      data: {
        week: week,
        year: year,
      },
    })
  }

  // check if Week exists after above query/create
  let results = await weekQuery(year, week)
    .catch(e => {
      throw new Error(e)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  // if week doesn't exist, create a new entry and return data
  if (!results) {
    let newWeekResults = await createWeekEntry(year, week)
      .catch(e => {
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })
    return newWeekResults
  }

  // if date did exist, return that data
  return results
}
