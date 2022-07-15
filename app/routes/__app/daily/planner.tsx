import * as React from 'react'
import { useLoaderData, useActionData, useSearchParams } from '@remix-run/react'
import { redirect } from '@remix-run/node'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { authenticator } from '../../../services/auth.server'

// components
import Container from '../../../components/Container'
import { HeaderOne } from '../../../components/Headlines'
import Wellness from '../../../components/daily/Wellness'
import Exercise from '../../../components/daily/Exercise'
import Tasks from '../../../components/daily/Tasks'
import Productivity from '../../../components/daily/Productivity'
import DailyNav from '../../../components/daily/DailyNav'

// libs for handling queries
import { findWellnessEntries } from '../../../queries/daily/findWellness'
import { findExerciseEntries } from '../../../queries/daily/findExercise'
import { findTasksEntries } from '../../../queries/daily/findTasks'
import { findProductivityEntries } from '../../../queries/daily/findProductivity'
import { deleteTask } from '../../../libs/daily/deleteTask'
import { completeTask } from '../../../libs/daily/completeTask'

// validators for form submissions
import { validateWellnessForm } from '../../../libs/daily/wellnessActions'
import { validateExerciseForm } from '../../../libs/daily/exerciseActions'
import { validateTaskForm } from '../../../libs/daily/taskActions'
import { validateProductivityForm } from '../../../libs/daily/productivityActions'
import { findOrCreateDate } from '../../../queries/findOrCreateDate'
import {
  createDateInstance,
  allWeekDaysFromWeek,
} from '../../../libs/dateFunctions'

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

  const [wellness, exercise, tasks, productivity] = await Promise.all([
    findWellnessEntries(dateResults.id, user.id),
    findExerciseEntries(dateResults.id, user.id),
    findTasksEntries(dateResults.id, user.id),
    findProductivityEntries(dateResults.id, user.id),
  ])

  return { wellness, exercise, tasks, productivity }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  let user = await authenticator.isAuthenticated(request)

  if (!user) {
    return redirect('/')
  }

  const url = new URL(request.url)
  const date = url.searchParams.get('date')
    ? url.searchParams.get('date')
    : 'today'

  const dateResults = await findOrCreateDate(date!)

  let results
  switch (formData.get('formType')) {
    case 'wellness':
      results = await validateWellnessForm(formData, user, dateResults.id)
      break
    case 'exercise':
      results = await validateExerciseForm(formData, user, dateResults.id)
      break
    case 'task':
      results = await validateTaskForm(formData, user, dateResults.id)
      break
    case 'productivity':
      results = await validateProductivityForm(formData, user, dateResults.id)
      break
    case 'deleteTask':
      results = await deleteTask(formData.get('id') as string, user)
      break
    case 'completeTask':
      results = await completeTask(formData, user)
      break

    default:
      results = 'Type does not meet valid action'
  }
  return results
}

export default function DailyPlanner() {
  const { wellness, exercise, tasks, productivity } = useLoaderData()

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
            <Wellness
              wellness={wellness}
              errors={errors?.formType === 'wellness' ? errors : null}
            />

            <Exercise
              exercise={exercise}
              errors={errors?.formType === 'exercise' ? errors : null}
            />
          </div>

          <Tasks
            entries={tasks}
            errors={errors?.formType === 'task' ? errors : null}
          />

          <Productivity
            productivity={productivity}
            errors={errors?.formType === 'productivity' ? errors : null}
          />
        </div>
      </Container>
    </>
  )
}
