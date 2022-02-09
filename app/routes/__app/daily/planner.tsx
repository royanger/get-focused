import {
  useLoaderData,
  ActionFunction,
  LoaderFunction,
  useActionData,
  redirect,
  useSearchParams,
} from 'remix'
import { authenticator } from '~/services/auth.server'

// components
import Container from '~/components/Container'
import { HeaderOne } from '~/components/Headlines'
import Wellness from '~/components/daily/Wellness'
import Exercise from '~/components/daily/Exercise'
import Tasks from '~/components/daily/Tasks'
import Notes from '~/components/daily/Notes'
import Productivity from '~/components/daily/Productivity'
import DailyNav from '~/components/daily/DailyNav'

// libs for handling queries
import { findWellnessEntries } from '~/queries/daily/findWellness'
import { findExerciseEntries } from '~/queries/daily/findExercise'
import { findTasksEntries } from '~/queries/daily/findTasks'
import { findNotesEntries } from '~/queries/daily/findNotes'
import { findProductivityEntries } from '~/queries/daily/findProductivity'
import { deleteTask } from '~/libs/daily/deleteTask'
import { completeTask } from '~/libs/daily/completeTask'

// validators for form submissions
import { validateWellnessForm } from '~/libs/daily/wellnessActions'
import { validateExerciseForm } from '~/libs/daily/exerciseActions'
import { validateTaskForm } from '~/libs/daily/taskActions'
import { validateNotesForm } from '~/libs/daily/noteActions'
import { validateProductivityForm } from '~/libs/daily/productivityActions'
import { findOrCreateDate } from '~/queries/findOrCreateDate'
import { createDateInstance, allWeekDaysFromWeek } from '~/libs/dateFunctions'

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect('/')
  }

  const url = new URL(request.url)

  const date = url.searchParams.get('date')
    ? url.searchParams.get('date')
    : 'today'

  const dateResults = await findOrCreateDate(date!)

  const [wellness, exercise, tasks, notes, productivity] = await Promise.all([
    findWellnessEntries(dateResults.id, user.id),
    findExerciseEntries(dateResults.id, user.id),
    findTasksEntries(dateResults.id, user.id),
    findNotesEntries(dateResults.id, user.id),
    findProductivityEntries(dateResults.id, user.id),
  ])

  return { wellness, exercise, tasks, notes, productivity }
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

  if (formData.get('formType') === 'deleteTask') {
    let results = await deleteTask(formData.get('id'), user)
    return results
  }

  if (formData.get('formType') === 'completeTask') {
    let results = await completeTask(formData, user)
    return results
  }

  // might want to throw an error here
  return 'Type does not meet valid action'
}

export default function DailyPlanner() {
  const { wellness, exercise, tasks, notes, productivity } = useLoaderData()
  const errors = useActionData()

  const [searchParams, setSearchParams] = useSearchParams()
  const paramDate = searchParams.get('date')

  const week = paramDate
    ? allWeekDaysFromWeek(
        createDateInstance(paramDate).weekNumber,
        createDateInstance(paramDate).weekYear
      )
    : allWeekDaysFromWeek(
        createDateInstance('today').weekNumber,
        createDateInstance('today').weekYear
      )

  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Daily Planner</HeaderOne>
          <DailyNav week={week} />

          <div className="grid grid-cols-2 my-8">
            <div>
              <Wellness
                wellness={wellness}
                errors={errors?.formType === 'wellness' ? errors : null}
              />
            </div>

            <div>
              <Exercise
                entries={exercise}
                errors={errors?.formType === 'exercise' ? errors : null}
              />
            </div>
          </div>

          <Tasks
            entries={tasks}
            errors={errors?.formType === 'task' ? errors : null}
          />

          <Productivity
            entries={productivity}
            errors={errors?.formType === 'productivity' ? errors : null}
          />

          <Notes
            entries={notes}
            errors={errors?.formType === 'note' ? errors : null}
          />
        </div>
      </Container>
    </>
  )
}
