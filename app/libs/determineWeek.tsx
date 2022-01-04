// this function should return the week of the month from a given date or 'today'
// it uses Sunday-Saturday as the week

export function determineWeek(date: string) {
  let regex = /^\d\d\d\d-[01]\d-[0123]\d/

  if (date !== 'today') {
    if (!regex.test(date)) {
      throw new Error('Incorrect date format passed')
    }
  }

  let currentDate
  if (date === 'today') {
    currentDate = new Date()
  } else {
    currentDate = new Date(
      parseInt(date.split('-').slice(0, 1)),
      parseInt(date.split('-').slice(1, 2)),
      parseInt(date.split('-').slice(2, 3)),
      0,
      0,
      0
    )
  }

  const oneJanuary = new Date(currentDate.getFullYear(), 0, 1)
  const lengthOfFirstWeek = 7 - oneJanuary.getDay()
  const numberOfDays = Math.floor(
    (currentDate - oneJanuary) / (24 * 60 * 60 * 1000)
  )

  return Math.ceil((numberOfDays + 1 - lengthOfFirstWeek) / 7) + 1
}
