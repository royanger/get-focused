import createDateInstance from './dateFunctions'

test('June 13, 1978 to be week 24', () => {
  expect(createDateInstance('1978-06-13').weekNumber).toBe(24)
})

test('June 13, 1978 to be week day 2', () => {
  expect(createDateInstance('1978-06-13').weekday).toBe(2)
})
