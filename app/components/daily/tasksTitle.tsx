import { HeaderTwo } from '../headlines'

interface TaskTitle {
  title: string
  info: string
}

export default function TasksTitle({ title, info }: TaskTitle) {
  return (
    <>
      <HeaderTwo>{title}</HeaderTwo>
      <p>{info}</p>
    </>
  )
}
