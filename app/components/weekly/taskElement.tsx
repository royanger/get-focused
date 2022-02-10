import * as React from 'react'
import { Form, useFetcher, useTransition } from 'remix'

// components
import Checkbox from '../forms/Checkbox'
import Input from '../forms/Input'
import TaskCancel from '../forms/TaskCancel'
import TaskSave from '../forms/TaskSave'
import DeleteIcon from '../icons/delete'

export default function TaskElement({
  id,
  placeholder,
  completed,
  value,
  type,
}: WeeklyTaskElement) {
  const [formState, setFormState] = React.useState('default')
  const formRef = React.useRef<HTMLFormElement>(null)
  const transition = useTransition()

  const isAdding =
    transition.submission &&
    transition.submission.formData.get('formType') === 'addWeeklyTask' &&
    transition.submission.formData.get('id') === id

  React.useEffect(() => {
    if (isAdding) {
      formRef.current?.reset()
    }
  })

  const fetcher = useFetcher()
  const isDeleting = fetcher.submission?.formData.get('id') === id
  const deleteFailed = fetcher.data?.error

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
    <li className={`py-4 ${currentStateDiv} ${isDeleting && 'hidden'}`}>
      <div className="flex flex-row">
        <div className="flex-grow">
          <Form ref={formRef} method="post" action="/weekly/planner">
            <input type="hidden" name="formType" value="addWeeklyTask" />
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="status" value={`status-${type}`} />

            <div className="flex flex-row items-center font-input">
              <Checkbox status={completed} label="Completed" />
              <Input
                value={value}
                formState={formState}
                name="taskname"
                placeholder={placeholder}
                setFormState={setFormState}
                width="flex-grow"
              />
            </div>
            <div className={`${currentStateButtons} col-span-7`}>
              <TaskSave />
              <TaskCancel setFormState={setFormState} />
            </div>
          </Form>
        </div>
        <div>
          <fetcher.Form method="post">
            <div className="w-12">
              <input type="hidden" name="formType" value="deleteWeeklyTask" />
              <input type="hidden" name="id" value={id} />
              <div className="flex flex-col items-center justify-start h-8">
                <button
                  //   aria-label={deleteFailed ? 'Retry Delete' : 'Delete'}
                  type="submit"
                  className="first:w-6 w-full text-purple"
                >
                  <DeleteIcon />
                </button>
              </div>
              {/* <div>{deleteFailed ? 'Retry' : 'Delete'}</div> */}
            </div>
          </fetcher.Form>
        </div>
      </div>
    </li>
  )
}
