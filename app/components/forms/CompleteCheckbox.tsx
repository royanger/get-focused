import * as React from 'react'
import { Form } from '@remix-run/react'
import Checkbox from './Checkbox'

export default function CompleteCheckbox({
  status,
  setCompletedStatus,
  id,
  label,
}: CompleteCheckbox) {
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setCompletedStatus(e.currentTarget.checked)
    const key: string = `completed-${id}`
    document.forms[key].submit()
  }
  return (
    <div className="w-12 first:w-7 text-purple h-auto flex justify-center">
      {id !== 'newtask-p1' && id !== 'newtask-p2' && id !== 'newtask-p3' && (
        <Form
          method="post"
          id={`completed-${id}`}
          name={`completed-${id}`}
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
