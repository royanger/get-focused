import { updateOrCreateExercise } from '~/queries/updateorCreateExercise'

export function validateExerciseForm(formData, user) {
  const errors = {}

  // make sure that one of the Radios is selected and error if none are
  if (formData.get('exercise') === null) {
    errors.formType = 'exercise'
    errors.error = 'Please indicate whether you exercised or not.'
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
