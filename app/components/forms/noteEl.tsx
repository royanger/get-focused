import NoteSave from './noteSave'
import NoteCancel from './noteCancel'
import { Form } from 'remix'
import { Note } from '~/interfaces'

export default function NoteEl({ id, dateId, note }: Note) {
  return (
    <>
      <Form method="post" action="/daily/planner">
        <input type="hidden" name="formType" value="note" />
        <input type="hidden" name="id" value={id} />
        <textarea
          defaultValue={note}
          name="message"
          className="w-full h-36 border-2 border-purple rounded p-2"
          placeholder="Enter your thoughts and notes here..."
        />
        <NoteSave />

        <NoteCancel />
      </Form>
    </>
  )
}
