import DOMPurify from 'isomorphic-dompurify'
import { updateOrCreateNote } from '~/queries/daily/updateOrCreateNote'

export async function validateNotesForm(formData, user) {
  let msg = formData.get('message')
    ? DOMPurify.sanitize(formData.get('message'))
    : null

  const errors = {}

  if (msg === null) {
    errors.formType = 'note'
    errors.id = formData.get('id')
    errors.msg =
      'Please make sure you fill out the note section. You can not save a blank form.'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  // handle updating/creating via upsert for entries.
  let results = await updateOrCreateNote(
    formData.get('id'),
    formData.get('message'),
    user.id
  )
  return results
}
