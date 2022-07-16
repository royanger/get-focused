import * as React from 'react'
import { Form } from '@remix-run/react'
import Checkbox from './Checkbox'

export default function CompleteCheckbox({
  status,
  setCompletedStatus,
  id,
  label,
  paramString,
}: CompleteCheckbox) {
  function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    setCompletedStatus(e.currentTarget.checked)
    const form = document.querySelector<HTMLFormElement>(
      `form[name='completed-${id}']`
    )
    form?.submit()
  }
  return (
    <div className="w-12 first:w-7 text-purple h-auto flex justify-center">
      {id !== 'newtask-p1' && id !== 'newtask-p2' && id !== 'newtask-p3' && (
        <Form
          method="post"
          id={`completed-${id}`}
          name={`completed-${id}`}
          action={paramString}
          className="m-2"
        >
          <input type="hidden" name="formType" value="completeTask" />
          <input type="hidden" name="id" value={id} />
          <Checkbox status={status} label={label} handleClick={handleClick} />
        </Form>
      )}
    </div>
  )
}
