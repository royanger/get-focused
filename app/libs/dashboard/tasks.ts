import { findAllTasks } from '../../queries/dashboard/tasks'
import { createDateInstance, formatDate, weeksInMonth } from '../dateFunctions'

export async function generateTasksData(user: string) {
  const dt = createDateInstance('today')

  const data = await findAllTasks(
    formatDate(dt.startOf('month').toISODate()),
    formatDate(dt.endOf('month').toISODate()),
    user
  )

  let completed = data?.partial?.filter(task => task.completed === true)

  // use current date
  // TODO use parameter when Dashboard is expanded
  const weeks = weeksInMonth(dt.weekNumber, dt.weekYear)

  let tasksByWeek
  await Promise.all(
    weeks.weekRange.map(week => {
      return findAllTasks(
        createDateInstance(week.start.split('T')[0]).toISODate(),
        createDateInstance(week.end.split('T')[0]).toISODate(),
        user
      )
    })
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
            data?.partial?.length - completed?.length,
            data?.all?.length - data?.partial?.length,
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
      labels: tasksByWeek?.map((_: any, i: number) => i + 1),
      datasets: [
        {
          label: 'Tasks by Week',
          data: tasksByWeek?.map((week, i) => {
            return week?.partial?.length
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
}
