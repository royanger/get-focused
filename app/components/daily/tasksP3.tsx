import TaskElement from '../forms/taskEl'
import { HeaderTwo } from '../headlines'

export default function TasksP1() {
  return (
    <>
      <HeaderTwo>Bonus Goals and Tasks</HeaderTwo>
      <p>
        If you finish all of the above tasks and goals, what are some tasks that
        would be awesome to finish today?
      </p>
      <TaskElement />
      <TaskElement />
      <TaskElement />
    </>
  )
}
