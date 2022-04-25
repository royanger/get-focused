import DOMPurify from 'isomorphic-dompurify'
import { updateOrCreateWin } from '../../queries/weekly/updateOrCreateWin'

export async function validateWinsForm(
  formData: FormData,
  user: { id: string },
  year: number,
  week: number
) {
  let item = formData.get('item')
    ? DOMPurify.sanitize(formData.get('item') as string)
    : null

  const errors = {} as ErrorObject

  if (item === null) {
    errors.formType = 'win'
    errors.id = formData.get('id')
    errors.message = 'Please make sure you fill out the form'
    return errors
  }

  //   handle updating/creating via upsert for entries.
  let results = await updateOrCreateWin(
    formData.get('id') as string,
    item,
    user.id,
    year,
    week
  )
  return results
}
