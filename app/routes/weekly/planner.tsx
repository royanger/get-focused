import * as React from 'react'
import {
  ActionFunction,
  LoaderFunction,
  useActionData,
  useLoaderData,
} from 'remix'
import { authenticator } from '~/services/auth.server'
import Container from '~/components/container'
import { HeaderOne, HeaderTwo } from '~/components/headlines'
import TaskElement from '~/components/weekly/taskElement'
import { findWeeklyTasks } from '~/queries/findWeeklyTasks'
import TasksTitle from '~/components/daily/tasksTitle'
import { PRIORITY_1, PRIORITY_2, PRIORITY_3 } from '~/libs/priorityIds'

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)

  let results = await findWeeklyTasks('today', user.id)

  return results
}

export const action: ActionFunction = ({ request }) => {
  return null
}

interface TasksByPriority {
  tasks: {
    id: string
    userId: string
    dateId: string
    statusId: string
    task: string
    completed: boolean
  }[]
  title: string
  info: string
  type: string
  errors: any
}

function tasksByPriority({
  tasks,
  title,
  info,
  errors,
  type,
}: TasksByPriority) {
  let taskList = tasks.map(task => {
    return (
      <React.Fragment key={task.id}>
        <TaskElement
          key={task.id}
          id={task.id}
          task={task.task}
          completed={task.completed}
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
  let data = useLoaderData()
  let errors = useActionData()

  let priorityOneTasks = data.filter(task => task.statusId === PRIORITY_1)

  let generatedP1Tasks
  let p1Title = 'Primary Tasks'
  let p1Info =
    'These are the most important tasks for your week, the tasks that need to be completed'

  generatedP1Tasks = tasksByPriority({
    tasks: priorityOneTasks,
    title: p1Title,
    info: p1Info,
    errors: errors,
    type: 'p1',
  })

  let priorityTwoTasks = data.filter(task => task.statusId === PRIORITY_2)

  let generatedP2Tasks
  let p2Title = 'Secondary Tasks'
  let p2Info =
    'The tasks here should be completed, but only after you complete the primary tasks.'

  generatedP2Tasks = tasksByPriority({
    tasks: priorityTwoTasks,
    title: p2Title,
    info: p2Info,
    errors: errors,
    type: 'p2',
  })

  let priorityThreeTasks = data.filter(task => task.statusId === PRIORITY_3)

  let generatedP3Tasks
  let p3Title = 'Non-Essential Tasks'
  let p3Info =
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

          {generatedP1Tasks}
          {generatedP2Tasks}
          {generatedP3Tasks}
        </div>
      </Container>
    </>
  )
}
