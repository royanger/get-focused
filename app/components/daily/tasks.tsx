import TasksTitle from './tasksTitle'
import TaskElement from '../forms/taskEl'
import { PRIORITY_1, PRIORITY_2, PRIORITY_3 } from '../../libs/priorityIds'
import React from 'react'

interface Tasks {
  entries: {
    id: string
    userId: string
    dateId: string
    statusId: string
    name: string
    actualTime: string
    goalTime: string
    timeTracker: number
  }[]
  errors: any
}
interface TasksByPriority {
  tasks: {
    id: string
    userId: string
    dateId: string
    statusId: string
    name: string
    actualTime: string
    goalTime: string
    timeTracker: number
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
      <>
        <TaskElement
          key={task.id}
          id={task.id}
          name={task.name}
          goalTime={task.goalTime}
          actualTime={task.actualTime}
          timeTracker={task.timeTracker}
        />
        {errors && errors.id === task.id ? (
          <div className="text-sm text-error mb-6 h-5">
            {errors ? errors.msg : ''}
          </div>
        ) : null}
      </>
    )
  })

  return (
    <React.Fragment key={Math.random()}>
      <TasksTitle title={title} info={info} key={type} />
      {taskList}
      <TaskElement
        key={`newtask-${type}`}
        id={`newtask-${type}`}
        name="Create a new task"
        goalTime="0"
        actualTime="0"
        timeTracker={0}
      />
      {errors && errors.id === `newtask-${type}` ? (
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.msg : ''}
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default function Tasks({ entries, errors }: Tasks) {
  let priorityOneTasks = entries.filter(task => task.statusId === PRIORITY_1)

  let generatedP1Tasks
  let p1Title = 'What is your most important goal(s) today?'
  let p1Info = 'Try to focus on one goal, but you can focus on a few.'

  generatedP1Tasks = tasksByPriority({
    tasks: priorityOneTasks,
    title: p1Title,
    info: p1Info,
    errors: errors,
    type: 'p1',
  })

  let priorityTwoTasks = entries.filter(task => task.statusId === PRIORITY_2)
  let generatedP2Tasks
  let p2Title = 'Important Goals and Tasks'
  let p2Info =
    'These tasks and goals are secondary to your most important goal, but are things you really want to finish today.'
  if (priorityTwoTasks.length > -1) {
    generatedP2Tasks = tasksByPriority({
      tasks: priorityTwoTasks,
      title: p2Title,
      info: p2Info,
      errors: errors,
      type: 'p2',
    })
  }

  let priorityThreeTasks = entries.filter(task => task.statusId === PRIORITY_3)
  let generatedP3Tasks
  let p3Title = 'Bonus Goals and Tasks'
  let p3Info =
    'If you finish all of the above tasks and goals, what are some tasks that would be awesome to finish today?'
  if (priorityThreeTasks.length > -1) {
    generatedP3Tasks = tasksByPriority({
      tasks: priorityThreeTasks,
      title: p3Title,
      info: p3Info,
      errors: errors,
      type: 'p3',
    })
  }

  return (
    <>
      {generatedP1Tasks}
      {generatedP2Tasks}
      {generatedP3Tasks}
    </>
  )
}
