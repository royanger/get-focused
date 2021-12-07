import NoteSave from './noteSave'
import NoteCancel from './noteCancel'
import { Form } from 'remix'

interface Note {
  id: string
  dateId?: string
  note: string
}

export default function NoteEl({ id, dateId, note }: Note) {
  return (
    <>
      <Form method="post" action="/daily/planner">
        <input type="hidden" name="formType" value="note" />
        <input
          type="textarea"
          defaultValue={note}
          name={id}
          className="w-full h-36 border-2 border-purple rounded"
        />
        <NoteSave />

        <NoteCancel />
      </Form>
    </>
  )
}
