import { findAllExerciseEntries } from '../../queries/dashboard/exercise'
import { currentDayCountInMonth } from '../dateFunctions'

export async function generateExerciseData(user: string) {
  const data = await findAllExerciseEntries(user)

  if (data === null || data.length < 1) return null

  const filteredResults = data.filter(entry => entry.completed === true)

  // determine days of month to current date
  // minus days that the user exercised from days of month
  // display that number as the 'no' number
  return {
    labels: ['Exercise Totals'],
    datasets: [
      {
        label: 'Yes',
        data: [filteredResults.length],
        backgroundColor: 'rgb(156, 39, 176)',
      },
      {
        label: 'No',
        data: [currentDayCountInMonth() - filteredResults.length],
        backgroundColor: 'rgb(33, 150, 243)',
      },
    ],
    //  }
  }
}
