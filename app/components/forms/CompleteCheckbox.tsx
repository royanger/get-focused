import React from 'react'
import Checkbox from './Checkbox'

export default function CompleteCheckbox({
  status,
  id,
  label,
}: CompleteCheckbox) {
  //   const [completedStatus, setCompletedStatus] = React.useState(status)

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    //  if (e.target.checked === true) {
    //  }
    //  setCompletedStatus(e.target.checked)
    const key = `completed-${id}`
    document.forms[key].submit()
  }
  return (
    <div className="w-12 first:w-7 text-purple h-auto flex justify-center">
      {id !== 'newtask-p1' && id !== 'newtask-p2' && id !== 'newtask-p3' && (
        <form
          method="post"
          id={`completed-${id}`}
          name={`completed-${id}`}
          className="m-2"
        >
          <input type="hidden" name="formType" value="completeTask" />
          <input type="hidden" name="id" value={id} />
          {/* <input type="hidden" name="status" value={status} /> */}
          <Checkbox status={status} label={label} handleClick={handleClick} />
          {/* <button type="submit">Submit</button> */}
        </form>
      )}
    </div>
  )
}
