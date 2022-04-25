import { updateOrCreateTask } from '../../queries/weekly/updateOrCreateTask'
import DOMPurify from 'isomorphic-dompurify'
import { deleteTaskQuery } from '../../queries/weekly/deleteTask'

export async function validateTaskForm(
  formData: FormData,
  user: { id: string },
  year: number,
  week: number
) {
  const errors = {} as ErrorObject

  if (formData.get('taskname') === null) {
    errors.formType = 'task'
    errors.id = formData.get('id')
    errors.message =
      'Please make sure you fill out the task field. This are required.'
    return errors
  }

  const taskName = DOMPurify.sanitize(formData.get('taskname') as string)

  const completed = formData.get('completed') === 'on' ? true : false

  let results = {
    success: true,
    data: {},
  }

  results.data = await updateOrCreateTask(
    formData.get('id') as string,
    taskName,
    completed,
    formData.get('status') as string,
    user.id,
    year,
    week
  )

  return results
}

export async function deleteTask(
  id: FormDataEntryValue | null,
  user: { id: string }
) {
  try {
    return await deleteTaskQuery(id, user.id)
  } catch (e) {
    return { error: true }
  }
}
