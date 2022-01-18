import { findAllProductivityEntries } from '~/queries/dashboard/productivity'

interface Results {
  score: number
  count: number
}
;[]

export async function generateProductivityData(user: string) {
  const data = await findAllProductivityEntries(user)

  if (data === null || data.length < 1) return null

  let results: Results[] = []
  for (let i = 0; i < data.length; i++) {
    if (results.find(({ score }) => score === data[i].score)) {
      for (let j = 0; j < results.length; j++) {
        if (results[j].score === data[i].score) {
          results[j] = { ...results[j], count: results[j].count + 1 }
        }
      }
    } else {
      results.push({ score: data[i].score, count: 1 })
    }
  }

  return {
    labels: results.map(result => result.score),
    datasets: [
      {
        label: 'Rating by Count',
        data: results.map(result => result.count),
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
