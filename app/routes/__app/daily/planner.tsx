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
import Container from '~/components/container'
import { HeaderOne } from '~/components/headlines'
import Wellness from '~/components/daily/wellness'
import Exercise from '~/components/daily/exercise'
import Tasks from '~/components/daily/tasks'
import Notes from '~/components/daily/notes'
import Productivity from '~/components/daily/productivity'
import DailyNav from '~/components/daily/dailyNav'

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

  const dateResults = url.searchParams.get('date')
    ? await findOrCreateDate(url.searchParams.get('date'))
    : await findOrCreateDate('today')

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

  if (formData.get('formType') === 'deleteTask') {
    let results = await deleteTask(formData, user)
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
  const data = useLoaderData()
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
          <DailyNav
            week={week}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />

          <div className="grid grid-cols-2 my-8">
            <div>
              <Wellness
                wellness={data.wellness}
                errors={errors?.formType === 'wellness' ? errors : null}
              />
            </div>

            <div>
              <Exercise
                entries={data.exercise}
                errors={errors?.formType === 'exercise' ? errors : null}
              />
            </div>
          </div>

          <Tasks
            entries={data.tasks}
            errors={errors?.formType === 'task' ? errors : null}
          />

          <Productivity
            entries={data.productivity}
            errors={errors?.formType === 'productivity' ? errors : null}
          />

          <Notes
            entries={data.notes}
            errors={errors?.formType === 'note' ? errors : null}
          />
        </div>
      </Container>
    </>
  )
}
