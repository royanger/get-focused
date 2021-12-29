import { useLoaderData } from 'remix'
import Container from '~/components/container'
import { HeaderOne } from '~/components/headlines'
import Wellness from '~/components/daily/wellness'
import Exercise from '~/components/daily/exercise'
import Tasks from '~/components/daily/tasks'
import Notes from '~/components/daily/notes'
import Productivity from '~/components/daily/productivity'
import { findWellnessEntries } from '~/queries/findWellness'
import { findExerciseEntries } from '~/queries/findExercise'
import { findTasksEntries } from '~/queries/findTasks'
import { findNotesEntries } from '~/queries/findNotes'
import { findProductivityEntries } from '~/queries/findProductivity'
import type { ActionFunction, LoaderFunction } from 'remix'
import { authenticator } from '~/services/auth.server'

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)

  let wellness = findWellnessEntries('today', user.id)
  let exercise = findExerciseEntries('today', user.id)
  let dailyTasks = findTasksEntries('today', user.id)
  let notes = findNotesEntries('today', user.id)
  let productivity = findProductivityEntries('today', user.id)

  let data = {}
  await Promise.all([wellness, exercise, dailyTasks, notes, productivity]).then(
    results => {
      console.log('test', results[0])

      data.wellness = results[0]
      data.exercise = results[1]
      data.tasks = results[2]
      data.notes = results[3]
      data.productivity = results[4]
    }
  )

  return data
}

export const action: ActionFunction = async ({ request }) => {
  console.log('action triggered')

  const formData = await request.formData()
  console.log('form data', formData)
  return 'action testing'
}

export default function DailyPlanner() {
  let data = useLoaderData()

  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Daily Planner</HeaderOne>

          <Wellness entries={data.wellness} />

          <Exercise entries={data.exercise} />

          <Tasks entries={data.tasks} />

          <Notes entries={data.notes} />

          <Productivity entries={data.productivity} />
        </div>
      </Container>
    </>
  )
}
