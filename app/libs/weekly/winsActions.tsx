import DOMPurify from 'isomorphic-dompurify'
import { updateOrCreateNote } from '~/queries/updateOrCreateNote'

export async function validateWinsForm(formData, user) {
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

  // handle updating/creating via upsert for entries.
  //   let results = await updateOrCreateNote(
  //     formData.get('id'),
  //     formData.get('message'),
  //     user.id
  //   )
  //   return results
  return 'complete'
}
