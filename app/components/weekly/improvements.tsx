import TasksTitle from '../daily/tasksTitle'
import React from 'react'
import ReviewElement from './reviewElement'

interface Items {
  items: {
    id: string
    userId: string
    dateId: string
    name: string
  }[]
  title: string
  info: string
  errors: any
}
interface TasksByPriority {
  tasks: {
    id: string
    userId: string
    dateId: string
    name: string
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
        <ReviewElement key={task.id} id={task.id} win={task.name} />
        {errors && errors.id === task.id ? (
          <div className="text-sm text-error mb-6 h-5">
            {errors ? errors.msg : ''}
          </div>
        ) : null}
      </React.Fragment>
    )
  })

  return (
    <React.Fragment>
      <TasksTitle title={title} info={info} key={type} />
      {taskList}
      <ReviewElement
        key={`newtask-${type}`}
        id={`newtask-${type}`}
        win="Create a new task"
      />
      {errors && errors.id === `newtask-${type}` ? (
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.msg : ''}
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default function Improvements({ items, title, info, errors }: Items) {
  let generatedP1Tasks

  generatedP1Tasks = tasksByPriority({
    tasks: items,
    title: title,
    info: info,
    errors: errors,
    type: 'p1',
  })

  return <>{generatedP1Tasks}</>
}
