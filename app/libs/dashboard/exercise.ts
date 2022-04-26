import { findAllExerciseEntries } from '../../queries/dashboard/exercise'

interface Results {
  completed: boolean
  count: number
}
;[]

export async function generateExerciseData(user: string) {
  const data = await findAllExerciseEntries(user)

  if (data === null || data.length < 1) return null

  let results: Results[] = []
  for (let i = 0; i < data.length; i++) {
    if (results.find(({ completed }) => completed === data[i].completed)) {
      for (let j = 0; j < results.length; j++) {
        if (results[j].completed === data[i].completed) {
          results[j] = { ...results[j], count: results[j].count + 1 }
        }
      }
    } else {
      results.push({ completed: data[i].completed, count: 1 })
    }
  }

  return {
    labels: ['Exercise Totals'],
    datasets: [
      {
        label: 'Yes',
        data: [results[1].count],
        backgroundColor: 'rgb(156, 39, 176)',
      },
      {
        label: 'No',
        data: [results[0].count],
        backgroundColor: 'rgb(33, 150, 243)',
      },
    ],
  }
}
