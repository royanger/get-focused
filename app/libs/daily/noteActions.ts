import DOMPurify from 'isomorphic-dompurify'
import { updateOrCreateNote } from '../../queries/daily/updateOrCreateNote'

export async function validateNotesForm(
  formData: FormData,
  user: { id: string },
  date: string
) {
  const tempId = formData.get('id') as string
  const tempMsg = formData.get('message') as string

  const id = tempId ? DOMPurify.sanitize(tempId) : undefined
  const message = tempMsg ? DOMPurify.sanitize(tempMsg) : null

  const errors = {} as ErrorObject

  if (message === null || id === undefined) {
    errors.formType = 'note'
    errors.id = formData.get('id')
    errors.message =
      'Please make sure you fill out the note section. You can not save a blank form.'
    return errors
  }

  // handle updating/creating via upsert for entries.
  let results = await updateOrCreateNote(id, message, user.id, date)
  return results
}
