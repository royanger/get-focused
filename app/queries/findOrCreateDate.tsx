import { prisma } from '../../prisma/db'

export let findOrCreateDate = async (targetDate: string) => {
  // if string is equal to 'today' then get today's date
  // if string is not 'today' then convert passed info and create date

  console.log('creating date')

  let regex = /\d\d\d\d-[01][012]-[0123]\d/
  if (targetDate != 'today') {
    if (!targetDate.match(regex)) {
      console.log('Target date provided was incorrect format')
      return null
    }
  }

  let date

  if (targetDate != 'today') {
    date = `${targetDate}T00:00:00.000Z`
  } else {
    // no date was passed, use current date
    const today = new Date().toISOString().slice(0, 10)
    date = `${today}T00:00:00.000Z`
  }

  // query to see if date entry exists
  async function dateQuery(date: string) {
    await prisma.$connect()
    return await prisma.date.findUnique({
      where: {
        date: date,
      },
    })
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
  let results = await dateQuery(date)
    .catch(e => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  // if date doesn't exist, create a new entry and return data
  if (!results) {
    let newDateResults = await createDateEntry(date)
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })
    return newDateResults
  }

  // if date did exist, return that data
  return results
}
