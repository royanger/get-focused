import { DateTime } from 'luxon'
import { prisma } from '../../prisma/db'

export let findOrCreateDate = async (targetDate: string) => {
  // if string is equal to 'today' then get today's date
  // if string is not 'today' then convert passed info and create date

  let regex = /\d\d\d\d-[01]\d-[0123]\d/
  if (targetDate != 'today') {
    if (!targetDate.match(regex)) {
      throw new Error('Target date provided was incorrect format')
    }
  }

  let date =
    targetDate !== 'today'
      ? DateTime.fromISO(targetDate).setZone('America/New_York')
      : DateTime.now().setZone('America/New_York')

  // set hour/min/sec/millisecond to 0
  // new Date entry is made only based on day/month/year this way
  const queryDate = date
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toISO()

  // query to see if date entry exists
  async function dateQuery(date: string) {
    await prisma.$connect()
    const results = await prisma.date.findUnique({
      where: {
        date: date,
      },
    })
    return results
  }

  // query to create date entry
  async function createDateEntry(date: string) {
    await prisma
    return await prisma.date.create({
      data: {
        date: date,
      },
    })
  }

  // check if date exists using above query
  let results = await dateQuery(queryDate)
    .catch(e => {
      throw new Error(e)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  // if date doesn't exist, create a new entry and return data
  if (!results) {
    let newDateResults = await createDateEntry(queryDate)
      .catch(e => {
        throw new Error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    return newDateResults
  }

  // if date did exist, return that data
  return results
}
