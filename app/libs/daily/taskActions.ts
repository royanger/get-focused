import DOMPurify from 'isomorphic-dompurify'
import { updateOrCreateTask } from '~/queries/daily/updateOrCreateTask'

export async function validateTaskForm(formData, user) {
  let taskName = formData.get('taskname')
    ? DOMPurify.sanitize(formData.get('taskname'))
    : null
  let goalTime = formData.get('goaltime')
    ? DOMPurify.sanitize(formData.get('goaltime'))
    : null

  const errors = {}

  if (taskName === null || goalTime === null || goalTime === '0') {
    errors.formType = 'task'
    errors.id = formData.get('id')
    errors.msg =
      'Please make sure you fill out the name and target fields. These are required.'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  // handle updating/creating via upsert for entries.
  let results = await updateOrCreateTask(
    formData.get('id'),
    formData.get('taskname'),
    formData.get('goaltime'),
    formData.get('actualtime'),
    parseInt(formData.get('timetracker')),
    formData.get('type'),
    user.id,
    formData.get('completed') === 'on' ? true : false
  )
  return results
}
