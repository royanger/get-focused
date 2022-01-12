import { updateOrCreateWeeklyTask } from '~/queries/updateOrCreateWeeklyTask'
import DOMPurify from 'isomorphic-dompurify'

export async function validateTaskForm(formData, user: string) {
  const errors = {}

  const taskName = formData.get('taskname')
    ? DOMPurify.sanitize(formData.get('taskname'))
    : null

  const completed = formData.get('completed') === 'on' ? true : false

  if (taskName === null) {
    errors.formType = 'task'
    errors.id = formData.get('id')
    errors.msg =
      'Please make sure you fill out the task field. This are required.'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  // latter we need to update the database
  // there is no check yet to see if the entry exists, so do .upsert

  let results = {
    success: true,
  }
  results.data = await updateOrCreateWeeklyTask(
    formData.get('id'),
    taskName,
    completed,
    formData.get('status'),
    user.id
  )
  return results
}
