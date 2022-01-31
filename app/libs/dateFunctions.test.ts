import {
  createDateInstance,
  createDateFromWeekAndYear,
  returnNextAndPreviousWeeks,
  startDateAndEndDateFromWeek,
  weeksInMonth,
  allWeekDaysFromWeek,
  formatDateRange,
  formatDate,
  formatDateForDailyNav,
} from './dateFunctions'

test('June 13, 1978 to be week 24', () => {
  expect(createDateInstance('1978-06-13').weekNumber).toBe(24)
})

test('June 13, 1978 to be week day 2', () => {
  expect(createDateInstance('1978-06-13').weekday).toBe(2)
})

test('June 13, 1978 to be week day 2', () => {
  expect(createDateInstance('1978-06-13').year).toBe(1978)
})

test('January 2, 2022 to be week 52 from 2021', () => {
  expect(createDateInstance('2022-01-02').weekNumber).toBe(52)
})

test('2021-12-27T00:00:00.000-05:00 to return error', () => {
  expect(() => {
    createDateInstance('2021-12-27T00:00:00.000-05:00').weekNumber
  }).toThrow('Incorrect date format passed')
})

test('2021-12-7 to return error', () => {
  expect(() => {
    createDateInstance('2021-12-7').weekNumber
  }).toThrow('Incorrect date format passed')
})

test('January 31, 2022 to return error', () => {
  expect(() => {
    createDateInstance('January 31, 2022').weekNumber
  }).toThrow('Incorrect date format passed')
})

test('1/31/2022 to return error', () => {
  expect(() => {
    createDateInstance('1/31/2022').weekNumber
  }).toThrow('Incorrect date format passed')
})

test('2022/1/31 to return error', () => {
  expect(() => {
    createDateInstance('v2022/1/31').weekNumber
  }).toThrow('Incorrect date format passed')
})

test('Jan 31, 2022 to return error', () => {
  expect(() => {
    createDateInstance('Jan 31, 2022').weekNumber
  }).toThrow('Incorrect date format passed')
})

test('Expect "today" to return correct URC date', () => {
  expect(createDateInstance('today').toUTC().toString().split('.')[0]).toBe(
    new Date().toISOString().split('.')[0]
  )
})

test('1252509854230 to return error', () => {
  expect(() => {
    createDateInstance('1252509854230').weekNumber
  }).toThrow('Incorrect date format passed')
})

test('Week 10, 2022 returns 2022-03-07', () => {
  expect(createDateFromWeekAndYear(10, 2022).toString().split('T')[0]).toBe(
    '2022-03-07'
  )
})

test('Week 52, 2021 returns 2021-12-27', () => {
  expect(createDateFromWeekAndYear(52, 2021).toString().split('T')[0]).toBe(
    '2021-12-27'
  )
})

test('100 as month returns en error', () => {
  expect(() => {
    createDateFromWeekAndYear(100, 2021)
  }).toThrow('Incorrect values for Week or Year passed')
})

test('22 as year returns en error', () => {
  expect(() => {
    createDateFromWeekAndYear(25, 22)
  }).toThrow('Incorrect values for Week or Year passed')
})

test('Week 53 to return null', () => {
  expect(createDateFromWeekAndYear(53, 2021)).toBeNull
})

test('Week 3, year 2022 should return week 2 and 4', () => {
  expect(
    returnNextAndPreviousWeeks(createDateFromWeekAndYear(3, 2022))
  ).toStrictEqual({
    prev: { year: 2022, week: 2 },
    next: { year: 2022, week: 4 },
  })
})

test('Week 1, year 2022 should return week 52 and 2', () => {
  expect(
    returnNextAndPreviousWeeks(createDateFromWeekAndYear(1, 2022))
  ).toStrictEqual({
    prev: { year: 2021, week: 52 },
    next: { year: 2022, week: 2 },
  })
})

test('Week 52, year 2021 should return week 51 and 1', () => {
  expect(
    returnNextAndPreviousWeeks(createDateFromWeekAndYear(52, 2021))
  ).toStrictEqual({
    prev: { year: 2021, week: 51 },
    next: { year: 2022, week: 1 },
  })
})

test('Test that week 1, year 2022 returns correct start and end dates', () => {
  expect(startDateAndEndDateFromWeek(1, 2022)).toStrictEqual({
    end: '2022-01-09T23:59:59.999-05:00',
    start: '2022-01-03T00:00:00.000-05:00',
  })
})

test('Test that week 1, year 2022 returns correct start and end dates', () => {
  expect(startDateAndEndDateFromWeek(52, 2021)).toStrictEqual({
    end: '2022-01-02T23:59:59.999-05:00',
    start: '2021-12-27T00:00:00.000-05:00',
  })
})

test('Test that week 3 returns all weeks from that month', () => {
  expect(weeksInMonth(3, 2022)).toStrictEqual({
    weekRange: [
      {
        end: '2022-01-02T23:59:59.999-05:00',
        start: '2021-12-27T00:00:00.000-05:00',
      },
      {
        end: '2022-01-09T23:59:59.999-05:00',
        start: '2022-01-03T00:00:00.000-05:00',
      },
      {
        end: '2022-01-16T23:59:59.999-05:00',
        start: '2022-01-10T00:00:00.000-05:00',
      },
      {
        end: '2022-01-23T23:59:59.999-05:00',
        start: '2022-01-17T00:00:00.000-05:00',
      },
      {
        end: '2022-01-30T23:59:59.999-05:00',
        start: '2022-01-24T00:00:00.000-05:00',
      },
      {
        end: '2022-02-06T23:59:59.999-05:00',
        start: '2022-01-31T00:00:00.000-05:00',
      },
    ],
    weeks: [0, 1, 2, 3, 4, 5],
  })
})

test('Test that week 5 returns the correct days (Mon-Sun) of that week', () => {
  expect(allWeekDaysFromWeek(5, 2022)).toStrictEqual([
    '2022-01-31T00:00:00.000-05:00',
    '2022-02-01T00:00:00.000-05:00',
    '2022-02-02T00:00:00.000-05:00',
    '2022-02-03T00:00:00.000-05:00',
    '2022-02-04T00:00:00.000-05:00',
    '2022-02-05T00:00:00.000-05:00',
    '2022-02-06T00:00:00.000-05:00',
  ])
})

test('Test that a date range is formatted correctly', () => {
  expect(
    formatDateRange(
      '2022-01-31T00:00:00.000-05:00',
      '2022-02-06T00:00:00.000-05:00'
    )
  ).toBe('January 31, 2022 - February 6, 2022')
})

test('Test that a date range is formatted correctly when it spans one year to another', () => {
  expect(
    formatDateRange(
      '2021-12-27T00:00:00.000-05:00',
      '2022-02-06T00:00:00.000-05:00'
    )
  ).toBe('December 27, 2021 - February 6, 2022')
})

test('2021-12-27T00:00:00.000-05:00 returns 2021-12-27', () => {
  expect(formatDate('2021-12-27T00:00:00.000-05:00')).toBe('2021-12-27')
})

test('2022-02-06T00:00:00.000-05:00 returns 2022-02-06', () => {
  expect(formatDate('2022-02-06T00:00:00.000-05:00')).toBe('2022-02-06')
})

test('2022-02-03T00:00:00.000-05:00 returns correct object', () => {
  expect(formatDateForDailyNav('2022-02-03T00:00:00.000-05:00')).toStrictEqual({
    dayName: 'Thu',
    shortDate: 'Feb 3, 2022',
  })
})
