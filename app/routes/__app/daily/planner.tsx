import {
  useLoaderData,
  ActionFunction,
  LoaderFunction,
  useActionData,
  redirect,
} from 'remix'
import { authenticator } from '~/services/auth.server'

// components
import Container from '~/components/container'
import { HeaderOne } from '~/components/headlines'
import Wellness from '~/components/daily/wellness'
import Exercise from '~/components/daily/exercise'
import Tasks from '~/components/daily/tasks'
import Notes from '~/components/daily/notes'
import Productivity from '~/components/daily/productivity'

// libs for handling queries
import { findWellnessEntries } from '~/queries/findWellness'
import { findExerciseEntries } from '~/queries/findExercise'
import { findTasksEntries } from '~/queries/findTasks'
import { findNotesEntries } from '~/queries/findNotes'
import { findProductivityEntries } from '~/queries/findProductivity'

// validators for form submissions
import { validateWellnessForm } from '~/libs/daily/wellnessActions'
import { validateExerciseForm } from '~/libs/daily/exerciseActions'
import { validateTaskForm } from '~/libs/daily/taskActions'
import { validateNotesForm } from '~/libs/daily/noteActions'
import { validateProductivityForm } from '~/libs/daily/productivityActions'
import { findOrCreateDate } from '~/queries/findOrCreateDate'

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect('/')
  }
  const dateResults = await findOrCreateDate('today')

  let data = {}
  await Promise.all([
    findWellnessEntries(dateResults.id, user.id),
    findExerciseEntries(dateResults.id, user.id),
    findTasksEntries(dateResults.id, user.id),
    findNotesEntries(dateResults.id, user.id),
    findProductivityEntries(dateResults.id, user.id),
  ]).then(results => {
    data.wellness = results[0]
    data.exercise = results[1]
    data.tasks = results[2]
    data.notes = results[3]
    data.productivity = results[4]
  })

  return data
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  let user = await authenticator.isAuthenticated(request)

  if (formData.get('formType') === 'wellness') {
    let results = await validateWellnessForm(formData, user)
    return results
  }

  if (formData.get('formType') === 'exercise') {
    let results = await validateExerciseForm(formData, user)
    return results
  }
  if (formData.get('formType') === 'task') {
    let results = await validateTaskForm(formData, user)
    return results
  }
  if (formData.get('formType') === 'note') {
    let results = await validateNotesForm(formData, user)
    return results
  }
  if (formData.get('formType') === 'productivity') {
    let results = await validateProductivityForm(formData, user)
    return results
  }

  // might want to throw an error here
  return 'Type does not meet valid action'
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
            wellness={data.wellness}
            errors={errors?.formType === 'wellness' ? errors : null}
          />

          <Exercise
            entries={data.exercise}
            errors={errors?.formType === 'exercise' ? errors : null}
          />

          <Tasks
            entries={data.tasks}
            errors={errors?.formType === 'task' ? errors : null}
          />

          <Notes
            entries={data.notes}
            errors={errors?.formType === 'note' ? errors : null}
          />

          <Productivity
            entries={data.productivity}
            errors={errors?.formType === 'productivity' ? errors : null}
          />
        </div>
      </Container>
    </>
  )
}