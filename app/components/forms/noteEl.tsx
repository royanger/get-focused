import NoteSave from './noteSave'
import NoteCancel from './noteCancel'

export default function NotesEl() {
  return (
    <>
      <input
        type="textarea"
        className="w-full h-36 border-2 border-purple rounded"
      />
      <NoteSave />

      <NoteCancel />
    </>
  )
}
