import * as React from 'react'
import {
  useActionData,
  useLoaderData,
  useSearchParams,
  useTransition,
} from '@remix-run/react'
import { redirect } from '@remix-run/node'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { DateTime } from 'luxon'
import { authenticator } from '../../../services/auth.server'

// components
import Container from '../../../components/Container'
import { HeaderOne } from '../../../components/Headlines'
import TaskElement from '../../../components/weekly/TaskElement'
import TasksTitle from '../../../components/daily/TasksTitle'
import WeeklyNav from '../../../components/weekly/WeeklyNav'

// libs for queries and actions
import { PRIORITY_1, PRIORITY_2, PRIORITY_3 } from '../../../libs/priorityIds'
import { findTasks } from '../../../queries/weekly/findTasks'
import { deleteTask, validateTaskForm } from '../../../libs/weekly/taskActions'
import {
  createDateInstance,
  formatDateRange,
  startDateAndEndDateFromWeek,
  createDateFromWeekAndYear,
  returnNextAndPreviousWeeks,
} from '../../../libs/dateFunctions'
import { completeTask } from '../../../libs/weekly/completeTask'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)

  // if there is no logged in user, redirect to landing page
  if (!user) {
    return redirect('/')
  }

  const url = new URL(request.url)

  let year
  let week

  // either get the week and year from the URL Params, or create a new
  // instance to use as a needed
  if (
    url.searchParams.get('week') === null ||
    url.searchParams.get('year') === null
  ) {
    year = createDateInstance('today').year
    week = createDateInstance('today').weekNumber
  } else {
    week = parseInt(url.searchParams.get('week')!)
    year = parseInt(url.searchParams.get('year')!)
  }

  const results = await findTasks(year, week, user.id)

  return results
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const user = await authenticator.isAuthenticated(request)

  // if there is no logged in user, redirect to landing page
  if (!user) {
    return redirect('/')
  }

  const url = new URL(request.url)
  const date = DateTime.now().setZone('America/New_York')
  const year = url.searchParams.get('year')
    ? parseInt(url.searchParams.get('year') as string)
    : date.weekYear
  const week = url.searchParams.get('week')
    ? parseInt(url.searchParams.get('week') as string)
    : date.weekNumber

  let results
  switch (formData.get('formType')) {
    case 'weeklyTask':
      results = await validateTaskForm(formData, user, year, week)
      break
    case 'deleteWeeklyTask':
      results = await deleteTask(formData.get('id'), user)
      break
    case 'completeTask':
      results = await completeTask(formData, user)
      break
    default:
      results = 'Type does not meet valid action'
  }
  return results
}

function tasksByPriority({ tasks, errors, type }: WeeklyTasksByPriority) {
  const taskList = tasks.map(task => {
    return (
      <React.Fragment key={task.id}>
        <TaskElement
          key={task.id}
          id={task.id}
          value={task.task}
          placeholder="Enter task name..."
          completed={task.completed}
          type={type}
          visibility="display"
        />
        {errors && errors.id === task.id ? (
          <div className="text-sm text-error mb-6 h-5">
            {errors ? errors.msg : ''}
          </div>
        ) : null}
      </React.Fragment>
    )
  })

  return taskList
}

export default function WeeklyPlanner() {
  const data = useLoaderData()
  const errors = useActionData()
  const transition = useTransition()

  // see if a new P1 task was submitted, and if so we will end up hiding the
  // form for a new task while the UI updates
  const transitionStateP1 =
    transition.submission?.formData.get('id') === 'newtask-p1'
      ? transition.state
      : null

  // confirm that a new P1 task is being added
  const isAddingP1 =
    transition.submission &&
    transition.submission?.formData.get('formType') === 'weeklyTask' &&
    transition.submission?.formData.get('id') === `newtask-p1`

  // repeat of above for P2 tasks
  const transitionStateP2 =
    transition.submission?.formData.get('id') === 'newtask-p2'
      ? transition.state
      : null

  const isAddingP2 =
    transition.submission &&
    transition.submission?.formData.get('formType') === 'weeklyTask' &&
    transition.submission?.formData.get('id') === `newtask-p2`

  // repeat of above for P2 tasks
  const transitionStateP3 =
    transition.submission?.formData.get('id') === 'newtask-p3'
      ? transition.state
      : null

  const isAddingP3 =
    transition.submission &&
    transition.submission?.formData.get('formType') === 'weeklyTask' &&
    transition.submission?.formData.get('id') === `newtask-p3`

  const taskname =
    isAddingP1 || isAddingP2 || isAddingP3
      ? transition.submission?.formData.get('taskname')
      : ''

  const [searchParams] = useSearchParams()
  const paramYear = searchParams.get('year')
  const paramWeek = searchParams.get('week')

  // if the year and week are undefined, then determine for current date
  const year = paramYear
    ? parseInt(paramYear)
    : createDateInstance('today').year
  const week = paramWeek
    ? parseInt(paramWeek)
    : createDateInstance('today').weekNumber

  // get previous week and year, and next week and year
  const nextAndPrev = returnNextAndPreviousWeeks(
    createDateFromWeekAndYear(week, year)
  )

  const startAndEndDates = startDateAndEndDateFromWeek(week, year)

  // format the dates for UI
  const dates = formatDateRange(startAndEndDates.start, startAndEndDates.end)

  const priorityOneTasks = data.filter(
    (task: any) => task.statusId === PRIORITY_1
  )

  let generatedP1Tasks

  generatedP1Tasks = tasksByPriority({
    tasks: priorityOneTasks,
    errors: errors,
    type: 'p1',
  })

  const priorityTwoTasks = data.filter(
    (task: any) => task.statusId === PRIORITY_2
  )

  let generatedP2Tasks

  generatedP2Tasks = tasksByPriority({
    tasks: priorityTwoTasks,
    errors: errors,
    type: 'p2',
  })

  const priorityThreeTasks = data.filter(
    (task: any) => task.statusId === PRIORITY_3
  )

  let generatedP3Tasks

  generatedP3Tasks = tasksByPriority({
    tasks: priorityThreeTasks,
    errors: errors,
    type: 'p3',
  })

  return (
    <Container>
      <>
        <HeaderOne>Weekly Planner</HeaderOne>

        <WeeklyNav
          navigation={{
            back: {
              year: nextAndPrev.prev.year,
              week: nextAndPrev.prev.week,
            },
            forward: {
              year: nextAndPrev.next.year,
              week: nextAndPrev.next.week,
            },
          }}
          dates={dates}
        />
        <TasksTitle
          title="Primary Tasks"
          info="These are the most important tasks for your week, the tasks that need to be completed."
          key="p1"
        />
        <div className="mt-2 mb-8">
          <ol key="list-p1">
            {generatedP1Tasks}
            {isAddingP1 && (
              <TaskElement
                key={Math.random()}
                id="addingtask-p1"
                placeholder="Enter your task here..."
                value={taskname}
                completed={false}
                type="p1"
                visibility="display"
              />
            )}

            <TaskElement
              key={`newtask-p1`}
              id={`newtask-p1`}
              placeholder="Create a new task"
              completed={false}
              type="p1"
              visibility={transitionStateP1 ? 'hidden' : 'display'}
            />
            {errors && errors.id === 'newtask-p1' ? (
              <div className="text-sm text-error mb-6 h-5">
                {errors ? errors.msg : ''}
              </div>
            ) : null}
          </ol>
        </div>

        <TasksTitle
          title="Secondary Tasks"
          info="The tasks here should be completed, but only after you complete the primary tasks."
          key="p2"
        />
        <div className="mt-2 mb-8">
          <ol key="list-p2">
            {generatedP2Tasks}
            {isAddingP2 && (
              <TaskElement
                key={Math.random()}
                id="addingtask-p2"
                placeholder="Enter your task here..."
                value={taskname}
                completed={false}
                type="p2"
                visibility="display"
              />
            )}
            <TaskElement
              key={`newtask-p2`}
              id={`newtask-p2`}
              placeholder="Create a new task"
              completed={false}
              type="p2"
              visibility={transitionStateP2 ? 'hidden' : 'display'}
            />
            {errors && errors.id === 'newtask-p2' ? (
              <div className="text-sm text-error mb-6 h-5">
                {errors ? errors.msg : ''}
              </div>
            ) : null}
          </ol>
        </div>

        <TasksTitle
          title="Non-Essential Tasks"
          info="These are the most important tasks for your week, the tasks that need to be completed."
          key="p3"
        />
        <div className="mt-2 mb-8">
          <ol key="list-p3">
            {generatedP3Tasks}
            {isAddingP3 && (
              <TaskElement
                key={Math.random()}
                id="addingtask-p3"
                placeholder="Enter your task here..."
                value={taskname}
                completed={false}
                type="p3"
                visibility="display"
              />
            )}
            <TaskElement
              key={`newtask-p3`}
              id={`newtask-p3`}
              placeholder="Create a new task"
              completed={false}
              type="p3"
              visibility={transitionStateP3 ? 'hidden' : 'display'}
            />
            {errors && errors.id === 'newtask-p3' ? (
              <div className="text-sm text-error mb-6 h-5">
                {errors ? errors.msg : ''}
              </div>
            ) : null}
          </ol>
        </div>
      </>
    </Container>
  )
}
