import DOMPurify from 'isomorphic-dompurify'
import { deleteImprovementQuery } from '~/queries/weekly/deleteImprovement'
import { updateOrCreateImprovement } from '~/queries/weekly/updateOrCreateImprovement'

export async function validateImprovementsForm(formData, user: string) {
  let item = formData.get('item')
    ? DOMPurify.sanitize(formData.get('item'))
    : null

  const errors = {}

  if (item === null) {
    errors.formType = 'improvements'
    errors.id = formData.get('id')
    errors.msg = 'Please make sure you fill out the form'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  // handle updating/creating via upsert for entries.
  let results = await updateOrCreateImprovement(
    formData.get('id'),
    item,
    user.id
  )
  return results
}

export async function deleteImprovementsForm(
  id: FormDataEntryValue | null,
  user: { id: string }
) {
  try {
    return await deleteImprovementQuery(id, user.id)
  } catch (e) {
    return { error: true }
  }
}
