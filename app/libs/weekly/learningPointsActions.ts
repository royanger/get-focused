import DOMPurify from 'isomorphic-dompurify'
import { deleteLearningPointQuery } from '../../queries/weekly/deleteLearningPoints'
import { updateOrCreateLearningPoint } from '../../queries/weekly/updateOrCreateLearningPoint'

export async function validateLearningPointsForm(
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
    errors.formType = 'learningpoints'
    errors.id = formData.get('id')
    errors.message = 'Please make sure you fill out the form'
    return errors
  }

  // handle updating/creating via upsert for entries.
  let results = await updateOrCreateLearningPoint(
    formData.get('id') as string,
    item,
    user.id,
    year,
    week
  )
  return results
}

export async function deleteLearningPoints(
  id: FormDataEntryValue | null,
  user: { id: string }
) {
  try {
    return await deleteLearningPointQuery(id, user.id)
  } catch (e) {
    return { error: true }
  }
}
