import { updateOrCreateWellness } from '~/queries/updateOrCreateWellness'

export async function validateWellnessForm(formData, user) {
  console.log('formData', formData)

  if (formData.get(`wellness-new`)) {
    // this is new wellness entry and no an edit/update
    // create entry in database
    const results = await updateOrCreateWellness(
      formData.get('id'),
      formData.get('rating'),
      user.id
    )

    return null
  }

  let wellnessScore = []
  new Array(10).fill(undefined).map((_, index) => {
    if (formData.get(`wellness-${index}`)) {
      wellnessScore.push(index)
    }
  })

  const errors = {}
  if (wellnessScore.length < 1) {
    errors.formType = 'wellness'
    errors.error = 'Please enter a wellness score'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  const results = await updateOrCreateWellness(
    formData.get('id'),
    formData.get('rating'),
    user.id
  )

  // latter we need to update the database
  return null
}
