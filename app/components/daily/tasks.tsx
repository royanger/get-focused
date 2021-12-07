import TasksTitle from './tasksTitle'
import TaskElement from '../forms/taskEl'
import { PRIORITY_1, PRIORITY_2, PRIORITY_3 } from '../../libs/priorityIds'

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
}

function tasksByPriority({ tasks, title, info }: TasksByPriority) {
  let taskList = tasks.map(task => {
    return (
      <TaskElement
        key={task.id}
        id={task.id}
        name={task.name}
        goalTime={task.goalTime}
        actualTime={task.actualTime}
        timeTracker={task.timeTracker}
      />
    )
  })

  return (
    <>
      <TasksTitle title={title} info={info} />
      {taskList}
      <TaskElement
        key="newtask"
        id="newtask"
        name="Create a new task"
        goalTime="0"
        actualTime="0"
        timeTracker={0}
      />
    </>
  )
}

export default function Tasks({ entries }: Tasks) {
  let priorityOneTasks = entries.filter(task => task.statusId === PRIORITY_1)

  let generatedP1Tasks
  let p1Title = 'What is your most important goal(s) today?'
  let p1Info = 'Try to focus on one goal, but you can focus on a few.'

  generatedP1Tasks = tasksByPriority({
    tasks: priorityOneTasks,
    title: p1Title,
    info: p1Info,
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
