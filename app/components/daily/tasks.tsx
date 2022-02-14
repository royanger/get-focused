import * as React from 'react'
import TasksTitle from './TasksTitle'
import TaskElement from '../forms/TaskElement'
import { PRIORITY_1, PRIORITY_2, PRIORITY_3 } from '../../libs/priorityIds'
import { useFetchers } from 'remix'

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
            timeTracker={task.timeTracker}
            type={type}
            completed={task.completed}
          />

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
  const fetchers = useFetchers()

  // create some isAdding variables to handle optimistic UI per task type
  // grab submitted data from useFetchers at the same time to render new item
  let isAddingP1, taskName, goaltime, fetchStateP1
  for (const f of fetchers) {
    if (f.submission && f.submission?.formData.get('id') === 'newtask-p1') {
      isAddingP1 = true
      taskName = f.submission?.formData.get('taskname')
      goaltime = f.submission?.formData.get('goaltime')
      fetchStateP1 = f.state
    }
  }

  let isAddingP2, fetchStateP2
  for (const f of fetchers) {
    if (f.submission && f.submission?.formData.get('id') === 'newtask-p2') {
      isAddingP2 = true
      taskName = f.submission?.formData.get('taskname')
      goaltime = f.submission?.formData.get('goaltime')
      fetchStateP2 = f.state
    }
  }

  let isAddingP3, fetchStateP3
  for (const f of fetchers) {
    if (f.submission && f.submission?.formData.get('id') === 'newtask-p3') {
      isAddingP3 = true
      taskName = f.submission?.formData.get('taskname')
      goaltime = f.submission?.formData.get('goaltime')
      fetchStateP3 = f.state
    }
  }

  let priorityOneTasks = entries
    ? entries.filter(task => task.statusId === PRIORITY_1)
    : null

  let generatedP1Tasks
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
      <TasksTitle
        title="What is your most important goal(s) today?"
        info="Try to focus on one goal, but you can focus on a few."
        key="p1"
      />
      {generatedP1Tasks && generatedP1Tasks}
      {isAddingP1 && (
        <TaskElement
          key={Math.random()}
          id="updatingtask-p1"
          placeholder="Enter your task here..."
          value={taskName}
          goalTime={goaltime}
          timeTracker={0}
          type="p1"
        />
      )}
      <div className={`flex flex-row ${fetchStateP1 ? 'hidden' : 'display'}`}>
        <TaskElement
          key={`newtask-p1`}
          id="newtask-p1"
          placeholder="Create a new task"
          goalTime="0"
          timeTracker={0}
          type="p1"
        />
      </div>
      {errors && errors.id === 'newtask-p1' ? (
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.msg : ''}
        </div>
      ) : null}

      <TasksTitle
        title="Important Goals and Tasks"
        info="These tasks and goals are secondary to your most important goal, but are things you really want to finish today."
        key="p2"
      />
      {generatedP2Tasks && generatedP2Tasks}
      {isAddingP2 && (
        <TaskElement
          key={Math.random()}
          id="updatingtask-p1"
          placeholder="Enter your task here..."
          value={taskName}
          goalTime={goaltime}
          timeTracker={0}
          type="p1"
        />
      )}

      <div className={`flex flex-row ${fetchStateP2 ? 'hidden' : 'display'}`}>
        <TaskElement
          key={`newtask-p2`}
          id="newtask-p2"
          placeholder="Create a new task"
          goalTime="0"
          timeTracker={0}
          type="p2"
        />
      </div>

      {errors && errors.id === 'newtask-p2' ? (
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.msg : ''}
        </div>
      ) : null}

      <TasksTitle
        title="Bonus Goals and Tasks"
        info="If you finish all of the above tasks and goals, what are some tasks that would be awesome to finish today?"
        key="p3"
      />
      {generatedP3Tasks && generatedP3Tasks}
      {isAddingP3 && (
        <TaskElement
          key={Math.random()}
          id="updatingtask-p1"
          placeholder="Enter your task here..."
          value={taskName}
          goalTime={goaltime}
          timeTracker={0}
          type="p1"
        />
      )}
      <div className={`flex flex-row ${fetchStateP3 ? 'hidden' : 'display'}`}>
        <TaskElement
          key={`newtask-p3`}
          id="newtask-p3"
          placeholder="Create a new task"
          goalTime="0"
          timeTracker={0}
          type="p3"
        />
      </div>
      {errors && errors.id === 'newtask-p3' ? (
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.msg : ''}
        </div>
      ) : null}
    </>
  )
}
