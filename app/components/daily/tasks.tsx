import TasksP1 from './tasksP1'
import TasksP2 from './tasksP2'
import TasksP3 from './tasksP3'

{
  /* <p>From DB: {data?.tasks && data.tasks[0]?.name}</p> */
}
{
  /* <p>From DB: {data?.task[1]?.name && data.task[1].name}</p> */
}

export default function Tasks() {
  return (
    <>
      <TasksP1 />
      <TasksP2 />
      <TasksP3 />
    </>
  )
}
