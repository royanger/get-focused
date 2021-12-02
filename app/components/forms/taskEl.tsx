import * as React from 'react'
import Input from './input'
import TaskCheckbox from './taskCheckbox'
import TaskRadio from './taskRadio'
import TaskSave from './taskSave'
import TaskCancel from './taskCancel'
import Edit from '../icons/edit'
import { Form } from 'remix'

interface Tasks {
  id?: string
  completed?: boolean
  statusId?: string
  name: string
  actualTime?: string
  goalTime?: string
  timeTracker?: number
}

export default function TaskElement({ name }: Tasks) {
  // this controls changes for all elements. Pass this as a prop as needed
  let [formState, setFormState] = React.useState('default')

  let defaultDiv = 'border-0'
  let editDiv = 'border-0 bg-grey-300 rounded'
  let [currentStateDiv, setCurrentStateDiv] = React.useState(defaultDiv)

  let defaultButtons = 'hidden'
  let editButtons = 'display'
  let [currentStateButtons, setCurrentStateButtons] =
    React.useState(defaultButtons)

  React.useEffect(() => {
    if (formState === 'edit') {
      setCurrentStateButtons(editButtons)
      console.log('edit buttons', editButtons)
      setCurrentStateDiv(editDiv)
    }
    if (formState === 'default') {
      setCurrentStateDiv(defaultDiv)
      setCurrentStateButtons(defaultButtons)
    }
  }, [formState, currentStateDiv, currentStateButtons, setCurrentStateButtons])

  return (
    <div className={`mb-3 ${currentStateDiv}`}>
      <Form>
        <div className="p-2 group-focus:bg-blue-700">
          <div className="flex flex-row items-center ">
            <Input value={name} formState={formState} />
            <TaskCheckbox />
            <div className="w-32 flex flex-row justify-center ">
              <TaskRadio />
              <TaskRadio />
              <TaskRadio />
              <TaskRadio />
              <TaskRadio />
            </div>
            <TaskCheckbox />
            <div className="w-8 first:w-7 text-purple h-auto">
              <button
                className="border-1 border-orange"
                onClick={e => setFormState('edit')}
              >
                <Edit />
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex-grow"></div>
            <div className="text-xs w-8 flex flex-row justify-center ">
              Target
            </div>
            <div className="text-xs w-32 flex flex-row justify-center ">
              Track your time
            </div>
            <div className="text-xs w-8 flex flex-row justify-center ">
              Actual
            </div>
            <div className="text-xs w-8 flex flex-row justify-center ">
              Edit
            </div>
          </div>
        </div>
        <div className={`${currentStateButtons}`}>
          <TaskSave />
          <TaskCancel />
        </div>
      </Form>
    </div>
  )
}
