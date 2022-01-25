import { deleteTaskQuery } from '~/queries/daily/deleteTask'

export async function deleteTask(formData, user) {
  const results = await deleteTaskQuery(formData.get('id'), user.id)
  return results
}
