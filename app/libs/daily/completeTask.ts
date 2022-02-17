import { completeTaskQuery } from '~/queries/daily/completeTask'

export async function completeTask(formData: FormData, user: { id: string }) {
  const status = (await formData.get('completed')) === 'on' ? true : false
  const results = await completeTaskQuery(
    status,
    formData.get('id') as string,
    user.id
  )

  return results
}
