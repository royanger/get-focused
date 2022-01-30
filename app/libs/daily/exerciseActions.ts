import { updateOrCreateExercise } from '~/queries/daily/updateorCreateExercise'

export async function validateExerciseForm(formData, user) {
  const errors = {}

  // make sure that value is not null
  if (formData.get('exercise') === null) {
    errors.formType = 'exercise'
    errors.error = 'Please indicate whether you exercised or not.'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  // TODO test that this works after other changes
  const completed = formData.get('exercise') === 'yes' ? true : false

  const results = await updateOrCreateExercise(
    formData.get('id'),
    completed,
    user.id
  )
  return null
}
