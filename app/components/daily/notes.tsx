import { HeaderTwo } from '../headlines'
import NoteEl from '../forms/noteEl'

interface Notes {
  entries: {
    id: string
    userId: string
    dateId: string
    note: string
  }[]
}

export default function Notes({ entries }: Notes) {
  console.log('ENTRIES', entries)
  return (
    <>
      <HeaderTwo>Notes</HeaderTwo>
      <p>
        Jot down any notes. These will be shown on the Weekly Review and can be
        accessed through your dashboard.
      </p>

      {entries.map(data => {
        return <NoteEl id={data.id} note={data.note} dateId={data.dateId} />
      })}
    </>
  )
}
