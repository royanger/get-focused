import { HeaderTwo } from '../Headlines'
import NoteEl from '../forms/NoteEl'

export default function Notes({ entries, errors }: Notes) {
  return (
    <div className="m-2 mt-8 p-3 border-0 rounded-lg shadow-md shadow-purple-100">
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
    </div>
  )
}
