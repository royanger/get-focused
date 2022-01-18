import { findAllWellnessEntries } from '~/queries/dashboard/wellness'

export async function generateWellnessData(user) {
  const data = await findAllWellnessEntries(user)

  if (data.length < 1) return null

  let indexList = []
  let results = []
  for (let i = 0; i < data.length; i++) {
    if (indexList.indexOf(data[i].rating) < 0) {
      console.log('false')
      const rating = data[i].rating
      indexList.push(data[i].rating)
      results.push({ rating: 0 })
    } else {
      console.log('true')
    }
  }
  console.log('index list', indexList)
  console.log('results', results)

  return data
}
