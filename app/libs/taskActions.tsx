import DOMPurify from 'isomorphic-dompurify'

export function validateTaskForm(formData) {
  console.log('task form', formData)

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

  // handle updating/creating via upset for entries.
  return null
}
