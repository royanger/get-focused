import { updateOrCreateWellness } from '../../queries/daily/updateOrCreateWellness'

export async function validateWellnessForm(
  formData: FormData,
  user: { id: string },
  date: string
) {
  const rating = formData.get('rating')
    ? formData.get('rating')?.toString()
    : '1'

  if (formData.get(`id`) === 'new') {
    // this is new wellness entry and not an edit/update
    // create entry in database
    const results = await updateOrCreateWellness(
      formData.get('id')?.toString(),
      parseInt(rating),
      user.id,
      date
    )

    return results
  }

  const errors = {} as ErrorObject
  if (parseInt(rating) < 1) {
    errors.formType = 'wellness'
    errors.message = 'Please enter a wellness score'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  const results = await updateOrCreateWellness(
    formData.get('id')?.toString(),
    parseInt(formData.get('rating')?.toString()),
    user.id,
    date
  )

  return results
}
