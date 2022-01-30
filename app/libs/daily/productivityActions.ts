import { updateOrCreateProductivity } from '~/queries/daily/updateOrCreateProductivity'

export async function validateProductivityForm(formData, user) {
  // error if the form was submitted without a score
  const errors = {}
  if (formData.get('rating') < 1) {
    errors.formType = 'productivity'
    errors.msg = 'Please enter a productivity score'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  if (formData.get('id') === 'new') {
    // this is new productivity entry and not an edit/update
    // create entry in database
    const results = await updateOrCreateProductivity(
      formData.get('id'),
      formData.get('rating'),
      user.id
    )
    return results
  }

  const results = await updateOrCreateProductivity(
    formData.get('id'),
    formData.get('rating'),
    user.id
  )
  return results
}
