import {
  useLoaderData,
  ActionFunction,
  LoaderFunction,
  useActionData,
} from 'remix'
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
import { authenticator } from '~/services/auth.server'
import { validateWellnessForm } from '~/libs/wellness'
import { validateExerciseForm } from '~/libs/exercise'

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

  if (formData.get('formType') === 'wellness') {
    let results = validateWellnessForm(formData)
    console.log('results', results)
    return results
  }

  if (formData.get('formType') === 'exercise') {
    let results = validateExerciseForm(formData)
    console.log('results', results)
    return results
  }

  return 'action testing'
}

export default function DailyPlanner() {
  let data = useLoaderData()
  const errors = useActionData()

  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Daily Planner</HeaderOne>

          <Wellness
            entries={data.wellness}
            errors={errors?.formType === 'wellness' ? errors : null}
          />

          <Exercise
            entries={data.exercise}
            errors={errors?.formType === 'exercise' ? errors : null}
          />

          <Tasks entries={data.tasks} />

          <Notes entries={data.notes} />

          <Productivity entries={data.productivity} />
        </div>
      </Container>
    </>
  )
}
