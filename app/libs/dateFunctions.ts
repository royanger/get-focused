import { DateTime } from 'luxon'

export function createDateInstance(date: string) {
  let regex = /^\d\d\d\d-[01]\d-[0123]\d/

  if (date !== 'today') {
    if (!regex.test(date)) {
      throw new Error('Incorrect date format passed')
    }
  }
  return date === 'today' ? DateTime.now() : DateTime.fromISO(date)
}

export function createDateFromWeekAndYear(week, year) {
  return DateTime.fromObject({ weekYear: year, weekNumber: week })
}

export function returnNextAndPreviousWeeks(date) {
  return {
    prev: {
      year: date.plus({ weeks: -1 }).year,
      week: date.plus({ weeks: -1 }).weekNumber,
    },
    next: {
      year: date.plus({ weeks: 1 }).year,
      week: date.plus({ weeks: 1 }).weekNumber,
    },
  }
}

export function startDateAndEndDateFromWeek(week, year) {
  const dt = createDateFromWeekAndYear(week, year)

  return {
    start: dt.startOf('week').toString(),
    end: dt.endOf('week').toString(),
  }
}

export function weeksInMonth(week: string, year: string) {
  const dt = createDateFromWeekAndYear(week, year)

  const startDate = DateTime.fromISO(dt.startOf('month').toString())

  let weekRange = []
  let weeks = []
  for (
    let i = 0;
    startDate.plus({ weeks: i }).startOf('week').month !==
    startDate.plus({ months: 1 }).month;
    i++
  ) {
    weekRange.push({
      start: startDate.plus({ weeks: i }).startOf('week').toString(),
      end: startDate.plus({ weeks: i }).endOf('week').toString(),
    })
    weeks.push(i)
  }
  return { weekRange: weekRange, weeks: weeks }
}

export function allWeekDaysFromWeek(week, year) {
  const dt = createDateFromWeekAndYear(week, year)

  // generate the whole week
  let weekdays = []

  for (let i = 0; i < 7; i++) {
    weekdays.push(dt.plus({ days: i }).toString())
  }

  return weekdays
}

export function formatDateRange(startDate: string, endDate: string) {
  return `${createDateInstance(startDate.split('T')[0]).toLocaleString(
    DateTime.DATE_FULL
  )} - ${createDateInstance(endDate.split('T')[0]).toLocaleString(
    DateTime.DATE_FULL
  )}`
}

export function formatDate(date: string) {
  const dt = createDateInstance(date.split('T')[0])
  return `${dt.year}-${('0' + dt.month).slice(-2)}-${('0' + dt.day).slice(-2)}`
}

export function formatDateForDailyNav(date: string) {
  const dt = createDateInstance(date)

  return {
    dayName: dt.weekdayShort,
    shortDate: dt.toLocaleString(DateTime.DATE_MED),
  }
}
