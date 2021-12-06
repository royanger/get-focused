import NoteSave from './noteSave'
import NoteCancel from './noteCancel'

interface Note {
  id: string
  dateId?: string
  note: string
}

export default function NoteEl({ id, dateId, note }: Note) {
  return (
    <>
      {/* {id}
      {dateId}
      {note} */}
      <input
        type="textarea"
        defaultValue={note}
        className="w-full h-36 border-2 border-purple rounded"
      />
      <NoteSave />

      <NoteCancel />
    </>
  )
}
