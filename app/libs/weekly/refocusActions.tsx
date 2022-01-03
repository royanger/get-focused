import DOMPurify from 'isomorphic-dompurify'
import { updateOrCreateNote } from '~/queries/updateOrCreateNote'

export async function validateRefocusForm(formData, user) {
  let item = formData.get('item')
    ? DOMPurify.sanitize(formData.get('item'))
    : null

  const errors = {}

  if (item === null) {
    errors.formType = 'refocus'
    errors.id = formData.get('id')
    errors.msg = 'Please make sure you fill out the form'
  }

  console.log('improv errors', errors)
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
