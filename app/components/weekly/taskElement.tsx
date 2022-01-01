import * as React from 'react'
import { Form } from 'remix'
import Button from '../button'
import Input from '../forms/input'
import TaskCancel from '../forms/taskCancel'
import TaskSave from '../forms/taskSave'

export default function Task() {
  const [formState, setFormState] = React.useState('default')

  let defaultDiv = 'border-0 rounded '
  let editDiv = 'border-0 bg-grey-200 rounded shadow-lg'
  let [currentStateDiv, setCurrentStateDiv] = React.useState(defaultDiv)

  let defaultButtons = 'hidden'
  let editButtons = 'display'
  let [currentStateButtons, setCurrentStateButtons] =
    React.useState(defaultButtons)

  React.useEffect(() => {
    if (formState === 'edit') {
      setCurrentStateButtons(editButtons)
      setCurrentStateDiv(editDiv)
    }
    if (formState === 'default') {
      setCurrentStateDiv(defaultDiv)
      setCurrentStateButtons(defaultButtons)
    }
  }, [formState, currentStateDiv, currentStateButtons, setCurrentStateButtons])

  function clickHandler() {
    console.log('child input clicked')
    setFormState('edit')
  }

  return (
    <li className={`p-4 ${currentStateDiv}`}>
      <Form method="post" action="/weekly/planner">
        <div className="flex flex-row items-center">
          <Input
            value="temp"
            formState={formState}
            name="taskname"
            placeholder="Enter your task here..."
            setFormState={setFormState}
            width="flex-grow"
          />

          <input
            className="mx-4 border-2 border-purple rounded text-xl w-6 h-6 "
            type="checkbox"
            aria-label="Completed"
          />
        </div>

        <div className={`${currentStateButtons} col-span-7`}>
          <TaskSave />
          <TaskCancel setFormState={setFormState} />
        </div>
      </Form>
    </li>
  )
}
