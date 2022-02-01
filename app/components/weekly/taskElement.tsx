import * as React from 'react'
import { Form } from 'remix'

// components
import Checkbox from '../forms/Checkbox'
import Input from '../forms/Input'
import TaskCancel from '../forms/TaskCancel'
import TaskSave from '../forms/TaskSave'

export default function TaskElement({
  id,
  placeholder,
  completed,
  value,
  type,
}) {
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
    setFormState('edit')
  }

  return (
    <li className={`p-4 ${currentStateDiv}`}>
      <Form method="post" action="/weekly/planner">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="status" value={`status-${type}`} />

        <div className="flex flex-row items-center font-input">
          <Input
            value={value}
            formState={formState}
            name="taskname"
            placeholder={placeholder}
            setFormState={setFormState}
            width="flex-grow"
          />
          <Checkbox status={completed} label="Completed" />
        </div>

        <div className={`${currentStateButtons} col-span-7`}>
          <TaskSave />
          <TaskCancel setFormState={setFormState} />
        </div>
      </Form>
    </li>
  )
}
