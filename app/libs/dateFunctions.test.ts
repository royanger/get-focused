import { createDateInstance, createDateFromWeekAndYear } from './dateFunctions'

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

test('January 3, 2022 to be week 1', () => {
  expect(createDateInstance('2022-01-03').weekNumber).toBe(1)
})

test('Expect "today" to return correct URC date', () => {
  expect(createDateInstance('today').toUTC().toString().split('.')[0]).toBe(
    new Date().toISOString().split('.')[0]
  )
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
