import * as React from 'react'
import TasksTitle from './TasksTitle'
import TaskElement from '../forms/TaskElement'
import { PRIORITY_1, PRIORITY_2, PRIORITY_3 } from '../../libs/priorityIds'
import DeleteButton from '../forms/DeleteButton'

function tasksByPriority({ tasks, type, errors }: TasksByPriority) {
  let taskList
  if (tasks) {
    taskList = tasks.map(task => {
      return (
        <div key={task.id} className="flex flex-row">
          <TaskElement
            key={task.id}
            id={task.id}
            value={task.name}
            placeholder="Enter your task here..."
            goalTime={task.goalTime}
            actualTime={task.actualTime}
            timeTracker={task.timeTracker}
            type={type}
            completed={task.completed}
          />
          <DeleteButton id={task.id} />
          {errors && errors.id === task.id ? (
            <div className="text-sm text-error mb-6 h-5">
              {errors ? errors.msg : ''}
            </div>
          ) : null}
        </div>
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
      <React.Fragment>
        <TasksTitle
          title="What is your most important goal(s) today?"
          info="Try to focus on one goal, but you can focus on a few."
          key="p1"
        />
        {generatedP1Tasks && generatedP1Tasks}
        <div className="flex flex-row">
          <TaskElement
            key={`newtask-p1`}
            id="newtask-p1"
            placeholder="Create a new task"
            goalTime="0"
            actualTime="0"
            timeTracker={0}
            type="p1"
          />
        </div>
        {errors && errors.id === 'newtask-p1' ? (
          <div className="text-sm text-error mb-6 h-5">
            {errors ? errors.msg : ''}
          </div>
        ) : null}
      </React.Fragment>

      <React.Fragment>
        <TasksTitle
          title="Important Goals and Tasks"
          info="These tasks and goals are secondary to your most important goal, but are things you really want to finish today."
          key="p2"
        />
        {generatedP2Tasks && generatedP2Tasks}
        <div className="flex flex-row">
          <TaskElement
            key={`newtask-p2`}
            id="newtask-p2"
            placeholder="Create a new task"
            goalTime="0"
            actualTime="0"
            timeTracker={0}
            type="p2"
          />
        </div>
        {errors && errors.id === 'newtask-p2' ? (
          <div className="text-sm text-error mb-6 h-5">
            {errors ? errors.msg : ''}
          </div>
        ) : null}
      </React.Fragment>

      <React.Fragment>
        <TasksTitle
          title="Bonus Goals and Tasks"
          info="If you finish all of the above tasks and goals, what are some tasks that would be awesome to finish today?"
          key="p3"
        />
        {generatedP3Tasks && generatedP3Tasks}
        <div className="flex flex-row">
          <TaskElement
            key={`newtask-p3`}
            id="newtask-p3"
            placeholder="Create a new task"
            goalTime="0"
            actualTime="0"
            timeTracker={0}
            type="p3"
          />
        </div>
        {errors && errors.id === 'newtask-p3' ? (
          <div className="text-sm text-error mb-6 h-5">
            {errors ? errors.msg : ''}
          </div>
        ) : null}
      </React.Fragment>
    </>
  )
}
