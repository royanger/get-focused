export function validateExerciseForm(formData) {
  const errors = {}
  if (formData.get('yes') !== 'on' && formData.get('no') !== 'on') {
    errors.formType = 'exercise'
    errors.error = 'Please indicate whether you exercised or not.'
  }
  if (Object.keys(errors).length) {
    return errors
  }

  // latter we need to update the database
  // there is no check yet to see if the entry exists, so do .upsert
  return null
}
