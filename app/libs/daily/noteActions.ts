import DOMPurify from 'isomorphic-dompurify'
import { updateOrCreateNote } from '~/queries/daily/updateOrCreateNote'

export async function validateNotesForm(
  formData: FormData,
  user: { id: string },
  date: string
) {
  let id = formData.get('id')?.toString()
  const msg = formData.get('message')?.toString()

  id = id ? DOMPurify.sanitize(id) : undefined
  const message = msg ? DOMPurify.sanitize(msg) : null

  const errors = {} as ErrorObject

  if (message === null || id === undefined) {
    errors.formType = 'note'
    errors.id = formData.get('id')
    errors.message =
      'Please make sure you fill out the note section. You can not save a blank form.'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  // handle updating/creating via upsert for entries.
  let results = await updateOrCreateNote(id, message, user.id, date)
  return results
}
