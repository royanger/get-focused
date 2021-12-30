export function validateTaskForm(formData) {
  console.log('task form', formData)
  const errors = {}
  errors.formType = 'task'
  errors.id = formData.get('id')
  errors.msg = 'Testing this out'

  if (Object.keys(errors).length) {
    return errors
  }

  return null
}
