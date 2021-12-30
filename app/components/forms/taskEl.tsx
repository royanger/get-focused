import * as React from 'react'
import Input from './input'
import TaskCheckbox from './taskCheckbox'
import TaskRadio from './taskRadio'
import TaskSave from './taskSave'
import TaskCancel from './taskCancel'
import Edit from '../icons/edit'
import { Form } from 'remix'

interface Tasks {
  id: string
  completed?: boolean
  statusId?: string
  name: string
  actualTime: string
  goalTime: string
  timeTracker: number
}

export default function TaskElement({
  id,
  name,
  goalTime,
  actualTime,
  timeTracker,
}: Tasks) {
  // this controls changes for all elements. Pass this as a prop as needed
  let [formState, setFormState] = React.useState('default')

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
    <div className={`mb-3 ${currentStateDiv}`}>
      <Form method="post" action="/daily/planner">
        <input type="hidden" name="formType" value="task" />
        <input type="hidden" name="id" value={id} />
        <div className="p-2 grid grid-cols-10">
          <div className="flex flex-row items-center col-span-7  pr-4">
            <Input
              value={name}
              formState={formState}
              name="taskname"
              placeholder="Enter your task here..."
              setFormState={setFormState}
              width="flex-grow"
            />
          </div>
          <div className="row-start-1 row-end-3 col-start-8 col-end-11">
            <div className="flex flex-row items-center">
              <Input
                value={goalTime}
                formState={formState}
                name="goaltime"
                placeholder=""
                setFormState={setFormState}
                width="w-14"
              />
              <div className="w-36 flex flex-row justify-center px-4">
                <TaskRadio />
                <TaskRadio />
                <TaskRadio />
                <TaskRadio />
                <TaskRadio />
              </div>
              <Input
                value={actualTime}
                formState={formState}
                name="actualtime"
                placeholder=""
                setFormState={setFormState}
                width="w-14"
              />
              <div className="w-12 first:w-7 text-purple h-auto flex justify-center">
                <button
                  type="button"
                  className="border-1 border-orange first:w-6 w-full "
                  onClick={() => setFormState('edit')}
                >
                  <Edit />
                </button>
              </div>
            </div>

            <div className="flex flex-row items-center">
              <div className="text-sm w-14 flex flex-row justify-center ">
                Target
              </div>
              <div className="text-sm w-36 flex flex-row justify-center ">
                Track your time
              </div>
              <div className="text-sm w-14 flex flex-row justify-center ">
                Actual
              </div>
              <div className="text-sm w-12 flex flex-row justify-center ">
                Edit
              </div>
            </div>
          </div>
          <div className={`${currentStateButtons} col-span-7`}>
            <TaskSave />
            <TaskCancel setFormState={setFormState} />
          </div>
        </div>
      </Form>
    </div>
  )
}
