import { deleteTaskQuery } from '~/queries/daily/deleteTask'

export async function deleteTask(formData, user) {
  try {
    return await deleteTaskQuery(formData.get('id'), user.id)
  } catch (e) {
    return { error: true }
  }
}
