import * as React from 'react'
import {
  ActionFunction,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useSearchParams,
} from 'remix'
import { authenticator } from '~/services/auth.server'
import { WeeklyTasksByPriority } from '~/interfaces'

// components
import Container from '~/components/container'
import { HeaderOne } from '~/components/headlines'
import TaskElement from '~/components/weekly/taskElement'
import TasksTitle from '~/components/daily/tasksTitle'
import WeeklyNav from '~/components/weekly/weeklyNav'

// libs for queries and actions
import { PRIORITY_1, PRIORITY_2, PRIORITY_3 } from '~/libs/priorityIds'
import { findWeeklyTasks } from '~/queries/findWeeklyTasks'
import { validateTaskForm } from '~/libs/weekly/taskActions'
import {
  calculateNextWeek,
  calculatePreviousWeek,
  determineWeek,
  determineYear,
  dateFromDay,
  formatDate,
} from '~/libs/dateFunctions'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)

  const url = new URL(request.url)

  let year
  let week

  if (
    url.searchParams.get('week') === null ||
    url.searchParams.get('year') === null
  ) {
    year = determineYear()
    week = determineWeek('today')
  } else {
    week = parseInt(url.searchParams.get('week'))
    year = parseInt(url.searchParams.get('year'))
  }

  const results = await findWeeklyTasks(year, week, user.id)

  return results
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const user = await authenticator.isAuthenticated(request)

  const results = validateTaskForm(formData, user, 'today')
  return results

  //   return null
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
          task={task.task}
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
          task="Create a new task"
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
  const errors = useActionData()

  const [searchParams, setSearchParams] = useSearchParams()
  const paramYear = searchParams.get('year')
  const paramWeek = searchParams.get('week')

  // if the year and week are undefined, then determine for current date
  const year = paramYear ? parseInt(paramYear) : determineYear()
  const week = paramWeek ? parseInt(paramWeek) : determineWeek('today')

  // get previous week and year, and next week and year
  const previousWeek = calculatePreviousWeek(year, week)
  const nextWeek = calculateNextWeek(year, week)
  const startAndEndDates = dateFromDay(year, week)
  // format the dates for UI
  const dates = formatDate(startAndEndDates.start, startAndEndDates.end)

  const priorityOneTasks = data.filter(task => task.statusId === PRIORITY_1)

  let generatedP1Tasks
  const p1Title = 'Primary Tasks'
  const p1Info =
    'These are the most important tasks for your week, the tasks that need to be completed'

  generatedP1Tasks = tasksByPriority({
    tasks: priorityOneTasks,
    title: p1Title,
    info: p1Info,
    errors: errors,
    type: 'p1',
  })

  const priorityTwoTasks = data.filter(task => task.statusId === PRIORITY_2)

  let generatedP2Tasks
  const p2Title = 'Secondary Tasks'
  const p2Info =
    'The tasks here should be completed, but only after you complete the primary tasks.'

  generatedP2Tasks = tasksByPriority({
    tasks: priorityTwoTasks,
    title: p2Title,
    info: p2Info,
    errors: errors,
    type: 'p2',
  })

  const priorityThreeTasks = data.filter(task => task.statusId === PRIORITY_3)

  let generatedP3Tasks
  const p3Title = 'Non-Essential Tasks'
  const p3Info =
    'Extra tasks that would be a pure bonus if you could complete them.'

  generatedP3Tasks = tasksByPriority({
    tasks: priorityThreeTasks,
    title: p3Title,
    info: p3Info,
    errors: errors,
    type: 'p3',
  })

  return (
    <>
      <Container>
        <div className="mt-8">
          <HeaderOne>Weekly Planner</HeaderOne>

          <WeeklyNav
            navigation={{
              back: { year: previousWeek.year, week: previousWeek.week },
              forward: { year: nextWeek.year, week: nextWeek.week },
            }}
            dates={dates}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          {generatedP1Tasks}
          {generatedP2Tasks}
          {generatedP3Tasks}
        </div>
      </Container>
    </>
  )
}
