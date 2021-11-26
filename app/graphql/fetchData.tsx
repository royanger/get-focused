async function fetchData(query, { variables } = {}) {
  const res = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  console.log('res', res)

  //   const json = await res.json()
  //   console.log('json', json)
  //   if (json.errors) {
  //     const { message } = json.errors[0] || 'Error..'
  //     throw new Error(message)
  //   }

  return res
}

export default fetchData
