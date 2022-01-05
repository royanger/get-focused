import { HeaderTwo } from '../headlines'
import { TaskTitle } from '~/interfaces'

export default function TasksTitle({ title, info }: TaskTitle) {
  return (
    <>
      <HeaderTwo>{title}</HeaderTwo>
      <p>{info}</p>
    </>
  )
}
