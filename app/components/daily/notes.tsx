import { HeaderTwo } from '../headlines'
import NoteEl from '../forms/noteEl'

interface Notes {
  entries: {
    id: string
    userId: string
    dateId: string
    note: string
  }[]
  errors: any
}

export default function Notes({ entries, errors }: Notes) {
  return (
    <>
      <HeaderTwo>Notes</HeaderTwo>
      <p>
        Jot down any notes. These will be shown on the Weekly Review and can be
        accessed through your dashboard.
      </p>
      <div className="text-sm text-error mb-6 h-5">
        {errors ? errors.msg : ''}
      </div>

      {entries.map(data => {
        return (
          <NoteEl
            key={data.id}
            id={data.id}
            note={data.note}
            dateId={data.dateId}
          />
        )
      })}
      <NoteEl key="newnote" id="note-new" note="" />
    </>
  )
}
