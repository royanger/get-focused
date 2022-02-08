import * as React from 'react'
import Input from './Input'
import TaskSave from './TaskSave'
import TaskCancel from './TaskCancel'
import Edit from '../icons/edit'
import { Form, useFetcher } from 'remix'
import CompleteCheckbox from './CompleteCheckbox'
import TimeTracker from './TimeTracker'
import DeleteIcon from '../icons/delete'

export default function TaskElement({
  id,
  value,
  placeholder,
  goalTime,
  actualTime,
  timeTracker,
  type,
  completed,
}: TaskElement) {
  // this controls changes for all elements. Pass this as a prop as needed
  let [formState, setFormState] = React.useState('default')
  const [tracker, setTracker] = React.useState(timeTracker)

  const fetcher = useFetcher()

  const isDeleting = fetcher.submission?.formData.get('id') === id

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

  // TODO: delete ?
  function clickHandler() {
    setFormState('edit')
  }

  const completedCSS = 'line-through text-grey-700'

  return (
    <div className={`flex flex-row ${isDeleting && 'hidden'}`}>
      <CompleteCheckbox label="completed" id={id} status={completed} />
      <div className={`mb-3 ${currentStateDiv}`}>
        <Form method="post" action="/daily/planner">
          <input type="hidden" name="formType" value="task" />
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="timetracker" value={tracker} />
          <div className="p-2 grid grid-cols-10">
            <div className="flex flex-row items-center col-span-7  pr-4">
              <Input
                value={value}
                formState={formState}
                name="taskname"
                placeholder={placeholder}
                setFormState={setFormState}
                width="flex-grow"
                completed={completed ? completedCSS : ''}
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
                  <TimeTracker tracker={tracker} setTracker={setTracker} />
                </div>
                <Input
                  value={actualTime}
                  formState={formState}
                  name="actualtime"
                  placeholder=""
                  setFormState={setFormState}
                  width="w-14"
                />
                <div className="w-12 first:w-7 h-8 ml-4 text-purple flex justify-center">
                  <button
                    type="button"
                    className="first:w-6 w-full "
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
                  {tracker < 1
                    ? 'Track your time'
                    : `${Math.floor(((tracker * 25) / 60) % 60)}h ${
                        tracker * 25 -
                        Math.floor(((tracker * 25) / 60) % 60) * 60
                      }m `}
                </div>
                <div className="text-sm w-14 flex flex-row justify-center ">
                  Actual
                </div>
                <div className="text-sm w-12 ml-4 flex flex-row justify-center ">
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
      <fetcher.Form method="post" className="my-2">
        <div className="w-12 flex flex-col align-center">
          <input type="hidden" name="formType" value="deleteTask" />
          <input type="hidden" name="id" value={id} />
          <div className="flex flex-col items-center justify-end h-8">
            <button type="submit" className="first:w-6 w-full text-purple">
              <DeleteIcon />
            </button>
          </div>
          <div>Delete</div>
        </div>
      </fetcher.Form>
    </div>
  )
}
