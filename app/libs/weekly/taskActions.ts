import { updateOrCreateTask } from '~/queries/weekly/updateOrCreateTask'
import DOMPurify from 'isomorphic-dompurify'

export async function validateTaskForm(formData, user: string) {
  const errors = {}

  if (formData.get('taskname') === null) {
    errors.formType = 'task'
    errors.id = formData.get('id')
    errors.msg =
      'Please make sure you fill out the task field. This are required.'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  const taskName = DOMPurify.sanitize(formData.get('taskname'))

  const completed = formData.get('completed') === 'on' ? true : false

  let results = {
    success: true,
    data: {},
  }

  results.data = await updateOrCreateTask(
    formData.get('id'),
    taskName,
    completed,
    formData.get('status'),
    user.id
  )

  return results
}
