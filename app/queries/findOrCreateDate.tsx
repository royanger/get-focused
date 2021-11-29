import { prisma } from '../../prisma/db'

export let findOrCreateDate = async (targetDate: string) => {
  // if string is equal to 'today' then get today's date
  // if string is not 'today' then convert passed info and create date
  let date
  if (targetDate != 'today') {
    // use 2021-12-25 format
    // TODO should confirm correct string/format was passed
    date = `${targetDate}T00:00:00.000Z`
  } else {
    // no date was passed, use current date
    const today = new Date().toISOString().slice(0, 10)
    date = `${today}T00:00:00.000Z`
  }

  // once date is ready, query DB to see if entry exists on Date Collection
  // if so, return that id
  // if not, create entry and return id of new entry
  async function dateQuery(date: string) {
    await prisma.$connect()
    return await prisma.date.findUnique({
      where: {
        date: date,
      },
    })
  }

  let results = await dateQuery(date)
    .catch(e => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
  return results
}
