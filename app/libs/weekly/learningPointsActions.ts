import DOMPurify from 'isomorphic-dompurify'
import { updateOrCreateLearningPoint } from '~/queries/weekly/updateOrCreateLearningPoint'

export async function validateLearningPointsForm(formData, user: string) {
  let item = formData.get('item')
    ? DOMPurify.sanitize(formData.get('item'))
    : null

  const errors = {}

  if (item === null) {
    errors.formType = 'learningpoints'
    errors.id = formData.get('id')
    errors.msg = 'Please make sure you fill out the form'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  // handle updating/creating via upsert for entries.
  let results = await updateOrCreateLearningPoint(
    formData.get('id'),
    item,
    user.id
  )
  return results
}
