import NoteSave from './noteSave'
import NoteCancel from './noteCancel'
import { Form, useTransition } from 'remix'
import { Note } from '~/interfaces'
import React from 'react'

export default function NoteEl({ id, note }: Note) {
  const transition = useTransition()
  console.log(transition.state)

  const [formValue, setFormValue] = React.useState(note)

  const text =
    transition.state === 'submitting'
      ? 'Saving...'
      : transition.state === 'loading'
      ? 'Saved!'
      : 'Go'

  function handleChange(e) {
    setFormValue(e.target.value)
  }

  if (transition.state === 'loading' && id === 'note-new') {
    console.log('RESET FORM')
    //  setFormValue('sjkadflasjfkldj')
  }
  return (
    <>
      <Form method="post" action="/daily/planner">
        <input type="hidden" name="formType" value="note" />
        <input type="hidden" name="id" value={id} />
        <textarea
          value={formValue}
          name="message"
          className="w-full h-36 border-2 border-purple rounded p-2"
          placeholder="Enter your thoughts and notes here..."
          onChange={e => handleChange(e)}
        />
        <NoteSave />

        <NoteCancel />
      </Form>
    </>
  )
}
