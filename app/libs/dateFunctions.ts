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

export function weeksInMonth(week: string) {
  const targetWeek = startDateAndEndDateFromWeek(currentWeekNumber(week))
  const month = targetWeek.start.getUTCMonth()

  // calculate first full week
  const dayOne = new Date()
  dayOne.setUTCMonth(month, 1)
  let firstWeek = currentWeekNumber(dayOne)

  let weekRange = []
  let weeks = []
  // if the week is 52, set it to 0 to start in previous year
  // run for look until the date is using a month + 1 or next month
  for (
    let i = firstWeek === 52 ? 0 : firstWeek;
    startDateAndEndDateFromWeek(i).start.getUTCMonth() !== month + 1;
    i++
  ) {
    weekRange.push(startDateAndEndDateFromWeek(i))
    weeks.push(i)
  }

  return { weekRange: weekRange, weeks: weeks }
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

  // start week on Sunday
  const weekStart = (incomingDate.getUTCDay() + 7) % 7

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

export function startDateAndEndDateFromWeek(week) {
  // create new date instance and set to Jan 1
  let targetDate = new Date()
  targetDate.setMonth(0, 1)

  // find first Thursday
  if (targetDate.getDay() !== 4) {
    targetDate.setMonth(0, 1 + ((4 - targetDate.getDay() + 7) % 7))
  }

  // find Thursday of the target week
  let weekByThursday = new Date()
  weekByThursday.setDate(targetDate.getDate() + (week - 1) * 7)

  // generate the starting Sunday and ending Saturday for the target
  let startSeconds = weekByThursday.setDate(weekByThursday.getDate() - 4)
  const start = new Date(startSeconds)
  let endSeconds = weekByThursday.setDate(weekByThursday.getDate() + 6)
  const end = new Date(endSeconds)

  return { start: start, end: end }
}

export function allWeekDaysFromWeek(week) {
  // create new date instance and set to Jan 1
  let targetDate = new Date()
  targetDate.setMonth(0, 1)

  // find first Thursday
  if (targetDate.getDay() !== 4) {
    targetDate.setMonth(0, 1 + ((4 - targetDate.getDay() + 7) % 7))
  }

  // find Thursday of the target week
  let weekByThursday = new Date()
  weekByThursday.setDate(targetDate.getDate() + (week - 1) * 7)

  // generate the starting Sunday and ending Saturday for the target
  let startSeconds = weekByThursday.setDate(weekByThursday.getDate() - 4)

  // generate the whole week
  let weekdays = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(startSeconds)
    weekdays.push(new Date(date.setDate(date.getDate() + i)))
  }

  return weekdays
}

const monthNames = [
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

const weekdayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export function formatDate(date: Date) {
  return `${date.getUTCFullYear()}-${('0' + (date.getUTCMonth() + 1)).slice(
    -2
  )}-${('0' + date.getUTCDate()).slice(-2)}`
}

export function formatDateRange(startDate: Date, endDate: Date) {
  return `${weekdayNames[startDate.getDay()]}, ${
    monthNames[startDate.getMonth()]
  } ${startDate.getDate()} - ${weekdayNames[endDate.getDay()]}, ${
    monthNames[endDate.getMonth()]
  } ${endDate.getDate()}, ${startDate.getFullYear()}`
}

const shortWeekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const shortMonthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function formatDateForDailyNav(date: Date) {
  return {
    dayName: shortWeekdayNames[date.getDay()],
    shortDate: `${
      shortMonthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`,
  }
}
