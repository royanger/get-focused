import { deleteTaskQuery } from '~/queries/daily/deleteTask'

export const deleteTask = async (id: string, user: { id: string }) => {
  try {
    return await deleteTaskQuery(id, user.id)
  } catch (e) {
    return { error: true, type: 'delete' }
  }
}
