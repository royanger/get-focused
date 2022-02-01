import { HeaderTwo } from '../headlines'

export default function TasksTitle({ title, info }: TaskTitle) {
  return (
    <>
      <HeaderTwo>{title}</HeaderTwo>
      <p>{info}</p>
    </>
  )
}
