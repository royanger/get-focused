import * as React from 'react'
import { Form } from 'remix'

// components
import Input from '../forms/input'
import TaskCancel from '../forms/taskCancel'
import TaskSave from '../forms/taskSave'

export default function ReviewElement({ id, item, formType }) {
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
    <div className={`p-4 ${currentStateDiv}`}>
      <Form method="post" action="/weekly/review">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="formType" value={formType} />

        <div className="flex flex-row items-center">
          <Input
            value={item}
            formState={formState}
            name="taskname"
            placeholder={item}
            setFormState={setFormState}
            width="flex-grow"
            aria-label={item}
          />
        </div>

        <div className={`${currentStateButtons} col-span-7`}>
          <TaskSave />
          <TaskCancel setFormState={setFormState} />
        </div>
      </Form>
    </div>
  )
}
