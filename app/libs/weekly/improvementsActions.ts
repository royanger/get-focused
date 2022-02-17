import DOMPurify from 'isomorphic-dompurify'
import { deleteImprovementQuery } from '~/queries/weekly/deleteImprovement'
import { updateOrCreateImprovement } from '~/queries/weekly/updateOrCreateImprovement'

export async function validateImprovementsForm(
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
    errors.formType = 'improvements'
    errors.id = formData.get('id')
    errors.message = 'Please make sure you fill out the form'
    return errors
  }

  // handle updating/creating via upsert for entries.
  let results = await updateOrCreateImprovement(
    formData.get('id') as string,
    item,
    user.id,
    year,
    week
  )
  return results
}

export async function deleteImprovements(
  id: FormDataEntryValue | null,
  user: { id: string }
) {
  try {
    return await deleteImprovementQuery(id, user.id)
  } catch (e) {
    return { error: true }
  }
}
