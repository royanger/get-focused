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
  const oneJanuary = new Date(date.getFullYear(), 0, 1)
  const lengthOfFirstWeek = 7 - oneJanuary.getDay()
  const lengthOfYear = isLeapYear(year) ? 366 : 365
  const partialStartWeek = lengthOfFirstWeek > 0 ? 1 : 0
  const fullWeeks = Math.floor((lengthOfYear - lengthOfFirstWeek) / 7)
  const partialEndWeek = (lengthOfYear - lengthOfFirstWeek) % 7 > 0 ? 1 : 0
  return partialStartWeek + fullWeeks + partialEndWeek
}

export function calculatePreviousWeek(year, week) {
  if (week === 1) {
    return { year: year - 1, week: calculateWeeksInYear(year - 1) }
  }
  return { year: year, week: week - 1 }
}

export function calculateNextWeek(year, week) {
  if (week === calculateWeeksInYear(year)) {
    return { year: year + 1, week: 1 }
  }
  return { year: year, week: week + 1 }
}

export function weekFromDay(year, week) {
  console.log('incoming week', week)

  const date = new Date(year, 0)

  const oneJanuary = new Date(date.getFullYear(), 0, 1)

  const lengthOfFirstWeek = 7 - oneJanuary.getDay()

  const day = (week - 2) * 7 + lengthOfFirstWeek + 1

  console.log('day', day)

  const start = new Date(date.setDate(day))
  // reset Date so year is correct
  date.setFullYear(year)
  console.log('wtf?', date)
  date.setDate(50)
  console.log('wtf!', date)

  const end = new Date(date.setDate(day + 6))

  return {
    start: start,
    end: end,
  }
}

export function weeksInMonth(year) {
  const date = new Date()
  const month = date.getUTCMonth()
  const formattedMonth = ('0' + month).slice(-2)
  const week = determineWeek(`${year}-${formattedMonth}-01`)
  const firstWeek = weekFromDay(year, week)
  console.log('testing', determineWeek('2022-02-05'))
  console.log(weekFromDay(2022, 8))

  //   let weeks = []
  //   weeks.push(firstWeek)
  //   let i = 1
  //   do {
  //     weeks.push(weekFromDay(year, week + i))
  //     i++
  //     console.log('i', i)
  //   } while (weekFromDay(year, week + i - 1).end.getUTCMonth() === month)

  //   console.log('weeks', weeks)

  return null
}

export function currentWeekNumber(date: any) {
  let incomingDate

  if (typeof date === 'string' && date.length) {
    incomingDate = new Date(date)
  } else if (date instanceof Date) {
    incomingDate = date
  } else {
    incomingDate = new Date()
  }

  const targetDate = new Date(incomingDate.valueOf())
  console.log('target', targetDate.getUTCDay())

  // start week on Sunday
  const weekStart = (incomingDate.getUTCDay() + 7) % 7

  console.log('week start', weekStart)

  // first full week is the first week with a Thursday
  targetDate.setDate(targetDate.getDate() - weekStart + 4)

  const firstThursday = targetDate.valueOf()

  // targetDate set to january first
  targetDate.setMonth(0, 1)
  // if its not a Thursday, correct to next Thursday
  if (targetDate.getUTCDay() !== 4) {
    targetDate.setMonth(0, 1 + ((4 - targetDate.getUTCDay() + 7) % 7))
  }

  // calculate the week number
  const weekNumber = 1 + Math.ceil((firstThursday - targetDate) / 604800000)
  return weekNumber
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export function formatDate(startDate: string, endDate: string) {
  return `${weekdays[startDate.getDay()]}, ${
    months[startDate.getMonth()]
  } ${startDate.getDate()} - ${weekdays[endDate.getDay()]}, ${
    months[endDate.getMonth()]
  } ${endDate.getDate()}, ${startDate.getFullYear()}`
}
