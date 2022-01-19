import { findAllTasks } from '~/queries/dashboard/tasks'

export async function generateTasksData(user: string) {
  const data = await findAllTasks('2022-01-01', '2022-01-31', user)

  console.log('TASKS', data?.partial)

  let completed = data?.partial.filter(task => task.completed === true)

  console.log('SORED?', completed)

  return {
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
  }
}
