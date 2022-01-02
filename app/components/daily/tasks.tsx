import TasksTitle from './tasksTitle'
import TaskElement from '../forms/taskElement'
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
  type: string
  errors: any
}

function tasksByPriority({ tasks, type, errors }: TasksByPriority) {
  let taskList
  if (tasks) {
    taskList = tasks.map(task => {
      return (
        <React.Fragment key={task.id}>
          <TaskElement
            key={task.id}
            id={task.id}
            name={task.name}
            goalTime={task.goalTime}
            actualTime={task.actualTime}
            timeTracker={task.timeTracker}
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
  } else {
    taskList = null
  }

  return taskList
}

export default function Tasks({ entries, errors }: Tasks) {
  let priorityOneTasks = entries
    ? entries.filter(task => task.statusId === PRIORITY_1)
    : null

  let generatedP1Tasks
  let p1Title = ''
  let p1Info = 'Try to focus on one goal, but you can focus on a few.'

  generatedP1Tasks = tasksByPriority({
    tasks: priorityOneTasks,
    errors: errors,
    type: 'p1',
  })

  let priorityTwoTasks = entries
    ? entries.filter(task => task.statusId === PRIORITY_2)
    : null
  let generatedP2Tasks

  generatedP2Tasks = tasksByPriority({
    tasks: priorityTwoTasks,
    errors: errors,
    type: 'p2',
  })

  let priorityThreeTasks = entries
    ? entries.filter(task => task.statusId === PRIORITY_3)
    : null
  let generatedP3Tasks

  generatedP3Tasks = tasksByPriority({
    tasks: priorityThreeTasks,
    errors: errors,
    type: 'p3',
  })

  return (
    <>
      {/* {generatedP1Tasks} */}
      <React.Fragment key={Math.random()}>
        <TasksTitle
          title="What is your most important goal(s) today?"
          info="Try to focus on one goal, but you can focus on a few."
          key="p1"
        />
        {generatedP1Tasks && generatedP1Tasks}
        <TaskElement
          key={`newtask-p1`}
          id="newtask-p1"
          name="Create a new task"
          goalTime="0"
          actualTime="0"
          timeTracker={0}
          type="p1"
        />
        {errors && errors.id === 'newtask-p1' ? (
          <div className="text-sm text-error mb-6 h-5">
            {errors ? errors.msg : ''}
          </div>
        ) : null}
      </React.Fragment>

      <React.Fragment key={Math.random()}>
        <TasksTitle
          title="Important Goals and Tasks"
          info="These tasks and goals are secondary to your most important goal, but are things you really want to finish today."
          key="p2"
        />
        {generatedP2Tasks && generatedP2Tasks}
        <TaskElement
          key={`newtask-p2`}
          id="newtask-p2"
          name="Create a new task"
          goalTime="0"
          actualTime="0"
          timeTracker={0}
          type="p2"
        />
        {errors && errors.id === 'newtask-p2' ? (
          <div className="text-sm text-error mb-6 h-5">
            {errors ? errors.msg : ''}
          </div>
        ) : null}
      </React.Fragment>

      <React.Fragment key={Math.random()}>
        <TasksTitle
          title="Bonus Goals and Tasks"
          info="If you finish all of the above tasks and goals, what are some tasks that would be awesome to finish today?"
          key="p3"
        />
        {generatedP3Tasks && generatedP3Tasks}
        <TaskElement
          key={`newtask-p3`}
          id="newtask-p3"
          name="Create a new task"
          goalTime="0"
          actualTime="0"
          timeTracker={0}
          type="p3"
        />
        {errors && errors.id === 'newtask-p3' ? (
          <div className="text-sm text-error mb-6 h-5">
            {errors ? errors.msg : ''}
          </div>
        ) : null}
      </React.Fragment>
    </>
  )
}
