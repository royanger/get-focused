import { HeaderTwo } from '../Headlines'

export default function TasksTitle({ title, info }: TaskTitle) {
  return (
    <>
      <HeaderTwo>{title}</HeaderTwo>
      <p>{info}</p>
    </>
  )
}
