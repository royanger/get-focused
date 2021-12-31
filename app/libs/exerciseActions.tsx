import { updateOrCreateExercise } from '~/queries/updateorCreateExercise'

export function validateExerciseForm(formData, user) {
  const errors = {}

  // make sure that one of the boxes is selected and error if none are
  if (formData.get('yes') !== 'on' && formData.get('no') !== 'on') {
    errors.formType = 'exercise'
    errors.error = 'Please indicate whether you exercised or not.'
  }
  if (formData.get('yes') === 'on' && formData.get('no') === 'on') {
    errors.formType = 'exercise'
    errors.error = 'Please select only Yes or No, and not both'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  const completed = formData.get('yes') === 'on' ? true : false

  // latter we need to update the database
  // there is no check yet to see if the entry exists, so do .upsert

  const results = updateOrCreateExercise(formData.get('id'), completed, user.id)
  return null
}
