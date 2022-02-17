import DOMPurify from 'isomorphic-dompurify'
import { updateOrCreateTask } from '~/queries/daily/updateOrCreateTask'

export async function validateTaskForm(
  formData: FormData,
  user: { id: string },
  date: string
) {
  const taskName = formData.get('taskname')
    ? DOMPurify.sanitize(formData.get('taskname') as string)
    : null
  const goalTime = formData.get('goaltime')
    ? DOMPurify.sanitize(formData.get('goaltime') as string)
    : null

  if (taskName === null || goalTime === null || goalTime === '0') {
    return {
      error: true,
      message:
        'Please make sure you fill out the name and target fields. These are required.',
      type: 'task',
      taskName: taskName,
      goalTime: goalTime,
    }
  }

  // handle updating/creating
  let results = await updateOrCreateTask(
    formData.get('id')?.toString(),
    taskName,
    goalTime,
    parseInt(formData.get('timetracker') as string),
    formData.get('type')?.toString(),
    user.id,
    formData.get('completed') === 'on' ? true : false,
    date
  )
  return results
}
