import { findAllTasks } from '~/queries/dashboard/tasks'
import {
  currentWeekNumber,
  startDateAndEndDateFromWeek,
  weeksInMonth,
} from '../dateFunctions'

export async function generateTasksData(user: string) {
  const data = await findAllTasks('2022-01-01', '2022-01-31', user)
  let completed = data?.partial.filter(task => task.completed === true)

  const startAndEndDate = startDateAndEndDateFromWeek(
    currentWeekNumber('2022-01-16')
  )

  const weeks = weeksInMonth('2022-01-16')
  console.log('weeks', weeks)
  weeks.weekRange.map(week => {
    console.log(
      'bleep',
      `${week.start.getFullYear()}-${('0' + week.start.getMonth()).slice(
        -2
      )}-${('0' + week.start.getDate()).slice(-2)}`
    )
  })

  // TODO Currently the function for weeksInMonth calculates week 1 as 52 and returns nothing

  await Promise.all(
    weeks.weekRange.map(week =>
      findAllTasks(
        `${week.start.getFullYear()}-${('0' + week.start.getMonth()).slice(
          -2
        )}-${('0' + week.start.getDate()).slice(-2)}`,
        `${week.end.getFullYear()}-${('0' + week.end.getMonth()).slice(-2)}-${(
          '0' + week.end.getDate()
        ).slice(-2)}`,
        user
      )
    )
  ).then(results => {
    console.log('test test', results)
  })

  return {
    monthly: {
      labels: ['Completed', 'Unfinished', 'Upcoming'],
      datasets: [
        {
          label: 'Status by Count',
          data: [
            completed.length,
            data?.partial.length - completed?.length,
            data?.all.length - data?.partial.length,
          ],
          backgroundColor: [
            'rgb(63, 81, 181)',
            'rgb(255, 87, 34)',
            'rgb(0, 150, 136)',
            'rgb(103, 58, 183',
            'rgb(33, 150, 243)',
            'rgb(244, 67, 54)',
            'rgb(96, 125, 139)',
            'rgb(255, 193, 7)',
            'rgb(156, 39, 176)',
            'rgb(0, 188, 212)',
          ],
          borderWidth: 1,
        },
      ],
    },
    average: {
      labels: ['Completed', 'Unfinished', 'Upcoming'],
      datasets: [
        {
          label: 'Status by Count',
          data: [
            completed.length,
            data?.partial.length - completed?.length,
            data?.all.length - data?.partial.length,
          ],
          backgroundColor: [
            'rgb(63, 81, 181)',
            'rgb(255, 87, 34)',
            'rgb(0, 150, 136)',
            'rgb(103, 58, 183',
            'rgb(33, 150, 243)',
            'rgb(244, 67, 54)',
            'rgb(96, 125, 139)',
            'rgb(255, 193, 7)',
            'rgb(156, 39, 176)',
            'rgb(0, 188, 212)',
          ],
          borderWidth: 1,
        },
      ],
    },
  }
}
