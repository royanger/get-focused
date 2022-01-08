import DOMPurify from 'isomorphic-dompurify'
import { updateOrCreateWin } from '~/queries/updateOrCreateWin'

export async function validateWinsForm(formData, user: string) {
  let item = formData.get('item')
    ? DOMPurify.sanitize(formData.get('item'))
    : null

  const errors = {}

  if (item === null) {
    errors.formType = 'win'
    errors.id = formData.get('id')
    errors.msg = 'Please make sure you fill out the form'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  //   handle updating/creating via upsert for entries.
  let results = await updateOrCreateWin(formData.get('id'), item, user.id)
  return results
}
