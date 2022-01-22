import DOMPurify from 'isomorphic-dompurify'
import { updateOrCreateRefocus } from '~/queries/findOrCreateRefocus'

export async function validateRefocusForm(formData, user: string) {
  let item = formData.get('item')
    ? DOMPurify.sanitize(formData.get('item'))
    : null

  const errors = {}

  if (item === null) {
    errors.formType = 'refocus'
    errors.id = formData.get('id')
    errors.msg = 'Please make sure you fill out the form'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  // handle updating/creating via upsert for entries.
  let results = await updateOrCreateRefocus(formData.get('id'), item, user.id)
  return results
}
