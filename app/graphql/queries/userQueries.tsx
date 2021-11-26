import fetchData from '../fetchData'

export async function findUsers() {
  const data = await fetchData(
    `query {
      findUsers {
         id, name, email
      }
   }`,
    { variables: {} }
  )
  return data?.findUsers
}
