import { deleteTasks } from '~/queries/daily/deleteTask'

export function deleteTask(formData, user) {
  console.log('lib for deleting task')
  deleteTasks(formData.get('id'), user.id)
  return null
}
