import { findAllTasks } from '~/queries/dashboard/tasks'
import { createDateInstance, formatDate, weeksInMonth } from '../dateFunctions'

export async function generateTasksData(user: string) {
  const startDate = new Date()
  startDate.setUTCDate(1)
  const endDate = new Date()
  endDate.setUTCMonth(endDate.getUTCMonth() + 1)
  endDate.setDate(0)
  const data = await findAllTasks(
    formatDate(startDate),
    formatDate(endDate),
    user
  )
  let completed = data?.partial.filter(task => task.completed === true)

  // use current date
  // TODO use parameter when Dashboard is expanded
  const dt = createDateInstance('today')
  const weeks = weeksInMonth(dt.weekNumber, dt.weekYear)

  let tasksByWeek
  await Promise.all(
    weeks.weekRange.map(week =>
      findAllTasks(
        `${week.start.getFullYear()}-${(
          '0' +
          (week.start.getMonth() + 1)
        ).slice(-2)}-${('0' + week.start.getDate()).slice(-2)}`,
        `${week.end.getFullYear()}-${('0' + (week.end.getMonth() + 1)).slice(
          -2
        )}-${('0' + week.end.getDate()).slice(-2)}`,
        user
      )
    )
  ).then(results => {
    tasksByWeek = results
  })

  return {
    monthly: {
      labels: ['Completed', 'Unfinished', 'Upcoming'],
      datasets: [
        {
          label: 'Status by Count',
          data: [
            completed?.length,
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
    tasksByWeek: {
      labels: tasksByWeek.map((_: any, i: number) => i + 1),
      datasets: [
        {
          label: 'Tasks by Week',
          data: tasksByWeek.map((week, i) => {
            return week.partial.length
          }),
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
    tasksInfoByWeek: tasksByWeek,
  }
  //   return null
}
