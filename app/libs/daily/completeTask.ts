import { completeTaskQuery } from '~/queries/daily/completeTask'

export async function completeTask(formData, user) {
  const status = (await formData.get('completed')) === 'on' ? true : false
  const results = completeTaskQuery(status, formData.get('id'), user.id)

  return null
}