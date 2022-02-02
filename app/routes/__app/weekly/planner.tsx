import * as React from 'react'
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useSearchParams,
} from 'remix'
import { authenticator } from '~/services/auth.server'

// components
import Container from '~/components/Container'
import { HeaderOne } from '~/components/Headlines'
import TaskElement from '~/components/weekly/TaskElement'
import TasksTitle from '~/components/daily/TasksTitle'
import WeeklyNav from '~/components/weekly/WeeklyNav'

// libs for queries and actions
import { PRIORITY_1, PRIORITY_2, PRIORITY_3 } from '~/libs/priorityIds'
import { findTasks } from '~/queries/weekly/findTasks'
import { validateTaskForm } from '~/libs/weekly/taskActions'
import {
  createDateInstance,
  formatDateRange,
  startDateAndEndDateFromWeek,
  createDateFromWeekAndYear,
  returnNextAndPreviousWeeks,
} from '~/libs/dateFunctions'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    return redirect('/')
  }

  const url = new URL(request.url)

  let year
  let week

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

  const results = await validateTaskForm(formData, user)

  return results
}

function tasksByPriority({
  tasks,
  title,
  info,
  errors,
  type,
}: WeeklyTasksByPriority) {
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
        />
        {errors && errors.id === task.id ? (
          <div className="text-sm text-error mb-6 h-5">
            {errors ? errors.msg : ''}
          </div>
        ) : null}
      </React.Fragment>
    )
  })

  return (
    <React.Fragment key={Math.random()}>
      <TasksTitle title={title} info={info} key={type} />
      <ol key={`list-${type}`}>
        {taskList}
        <TaskElement
          key={`newtask-${type}`}
          id={`newtask-${type}`}
          placeholder="Create a new task"
          completed={false}
          type={type}
        />
        {errors && errors.id === `newtask-${type}` ? (
          <div className="text-sm text-error mb-6 h-5">
            {errors ? errors.msg : ''}
          </div>
        ) : null}
      </ol>
    </React.Fragment>
  )
}

export default function WeeklyPlanner() {
  const data = useLoaderData()
  const actionData = useActionData()

  const [weeklyTasks, _] = React.useState(data)
  const [searchParams, setSearchParams] = useSearchParams()
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

  const priorityOneTasks = weeklyTasks.filter(
    (task: any) => task.statusId === PRIORITY_1
  )

  let generatedP1Tasks
  const p1Title = 'Primary Tasks'
  const p1Info =
    'These are the most important tasks for your week, the tasks that need to be completed'

  generatedP1Tasks = tasksByPriority({
    tasks: priorityOneTasks,
    title: p1Title,
    info: p1Info,
    errors: actionData,
    type: 'p1',
  })

  const priorityTwoTasks = weeklyTasks.filter(
    (task: any) => task.statusId === PRIORITY_2
  )

  let generatedP2Tasks
  const p2Title = 'Secondary Tasks'
  const p2Info =
    'The tasks here should be completed, but only after you complete the primary tasks.'

  generatedP2Tasks = tasksByPriority({
    tasks: priorityTwoTasks,
    title: p2Title,
    info: p2Info,
    errors: actionData,
    type: 'p2',
  })

  const priorityThreeTasks = weeklyTasks.filter(
    (task: any) => task.statusId === PRIORITY_3
  )

  let generatedP3Tasks
  const p3Title = 'Non-Essential Tasks'
  const p3Info =
    'Extra tasks that would be a pure bonus if you could complete them.'

  generatedP3Tasks = tasksByPriority({
    tasks: priorityThreeTasks,
    title: p3Title,
    info: p3Info,
    errors: actionData,
    type: 'p3',
  })

  return (
    <>
      <Container>
        <div className="mt-8">
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
          {generatedP1Tasks}
          {generatedP2Tasks}
          {generatedP3Tasks}
        </div>
      </Container>
    </>
  )
}
