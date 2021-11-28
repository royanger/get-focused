export let getDate = date => {
  if (date != 'today') {
    // use 2021-12-25 format
    // TODO should confirm correct string/format was passed
    return `${date}T00:00:00.000Z`
  } else {
    // no date was passed, use current date
    const today = new Date().toISOString().slice(0, 10)
    return `${today}T00:00:00.000Z`
  }
}
