import TaskElement from '../forms/taskEl'
import { HeaderTwo } from '../headlines'

export default function TasksP1() {
  return (
    <>
      <HeaderTwo>Important Goals and Tasks</HeaderTwo>
      <p>
        These tasks and goals are secondary to your most important goal, but are
        things you really want to finish today.
      </p>
      <TaskElement />
      <TaskElement />
    </>
  )
}
