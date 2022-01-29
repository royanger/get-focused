import React from 'react'
import NoteSave from './noteSave'
import NoteCancel from './noteCancel'
import { Form, useTransition } from 'remix'
import { Note } from '~/interfaces'

export default function NoteEl({ id, note }: Note) {
  const transition = useTransition()
  let formRef = React.useRef()
  let noteRef = React.useRef()
  let isAdding =
    transition.state === 'submitting' &&
    transition.submission.formData.get('formType') === 'note'

  React.useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset()
      // TODO This might be casuing issues with the page loading and jumping
      // halfway down when there are multiple Notes
      // noteRef.current?.focus()
    }
  }, [isAdding])

  return (
    <>
      <Form ref={formRef} method="post" action="/daily/planner" id={id}>
        <input type="hidden" name="formType" value="note" />
        <input type="hidden" name="id" value={id} />
        <textarea
          ref={noteRef}
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
