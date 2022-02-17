import { updateOrCreateProductivity } from '~/queries/daily/updateOrCreateProductivity'

export async function validateProductivityForm(
  formData: FormData,
  user: { id: string },
  date: string
) {
  // error if the form was submitted without a score
  const errors = {} as ErrorObject
  if (formData && parseInt(formData.get('rating')) < 1) {
    errors.formType = 'productivity'
    errors.message = 'Please enter a productivity score'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  if (formData.get('id') === 'new') {
    // this is new productivity entry and not an edit/update
    // create entry in database
    const results = await updateOrCreateProductivity(
      formData.get('id')?.toString(),
      formData.get('rating'),
      user.id,
      date
    )
    return results
  }

  const results = await updateOrCreateProductivity(
    formData.get('id')?.toString(),
    formData.get('rating'),
    user.id,
    date
  )
  return results
}
