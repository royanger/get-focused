import { updateOrCreateWellness } from '~/queries/updateOrCreateWellness'

export async function validateWellnessForm(formData, user) {
  if (formData.get(`id`) === 'new') {
    // this is new wellness entry and no an edit/update
    // create entry in database
    const results = await updateOrCreateWellness(
      formData.get('id'),
      formData.get('rating'),
      user.id
    )

    return results
  }

  const errors = {}
  if (formData.get('rating') < 1) {
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

  return results
}