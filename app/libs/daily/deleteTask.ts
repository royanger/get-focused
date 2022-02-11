import { deleteTaskQuery } from '~/queries/daily/deleteTask'

export const deleteTask: QueryInfo = async (id, user) => {
  try {
    //  return await deleteTaskQuery(id, user.id)
    return { error: true, type: 'delete' }
  } catch (e) {
    return { error: true, type: 'delete' }
  }
}
