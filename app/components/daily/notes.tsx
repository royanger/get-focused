import { HeaderTwo } from '../headlines'
import NotesEl from '../forms/noteEl'

export default function Notes() {
  return (
    <>
      <HeaderTwo>Notes</HeaderTwo>
      <p>
        Jot down any notes. These will be shown on the Weekly Review and can be
        accessed through your dashboard.
      </p>
      <NotesEl />
    </>
  )
}
