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
    const dateArray = date.split('-')
    currentDate = new Date(
      parseInt(dateArray[0]),
      parseInt(dateArray[1]),
      parseInt(dateArray[2]),
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

export function determineYear() {
  const date = new Date()
  return date.getFullYear()
}

function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
}

export function calculateWeeksInYear(year) {
  const date = new Date(year, 0, 1)
  console.log('date', date)

  const oneJanuary = new Date(date.getFullYear(), 0, 1)
  console.log('jan one', oneJanuary.getDay())

  const lengthOfFirstWeek = 7 - oneJanuary.getDay()
  console.log('first week', lengthOfFirstWeek)
  const lengthOfYear = isLeapYear(year) ? 366 : 365

  const partialStartWeek = lengthOfFirstWeek > 0 ? 1 : 0
  const fullWeeks = Math.floor((lengthOfYear - lengthOfFirstWeek) / 7)
  const partialEndWeek = (lengthOfYear - lengthOfFirstWeek) % 7 > 0 ? 1 : 0

  return partialStartWeek + fullWeeks + partialEndWeek
}

export function calculatePreviousWeek(year, week) {
  if (week === 1) {
    // TODO need to calculate week (Sun-Sat) of previous year
    console.log('testing', calculateWeeksInYear(year - 1))
    return { year: year - 1, week: calculateWeeksInYear(year - 1) }
  }

  return { year: year, week: week - 1 }
}

export function calculateNextWeek(year, week) {
  if (week === calculateWeeksInYear(year)) {
    // TODO need to calculate week (Sun-Sat) of previous year
    return { year: year + 1, week: 1 }
  }

  return { year: year, week: week + 1 }
}
