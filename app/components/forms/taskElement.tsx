import * as React from 'react'
import Input from './Input'
import TaskSave from './TaskSave'
import TaskCancel from './TaskCancel'
import Edit from '../icons/edit'
import { useFetcher } from 'remix'
import CompleteCheckbox from './CompleteCheckbox'
import TimeTracker from './TimeTracker'
import DeleteIcon from '../icons/delete'
import CancelIcon from '../icons/CancelIcon'
import SaveIcon from '../icons/SaveIcon'

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
  const [editing, setEditing] = React.useState(false)
  const [formWasReset, setFormWasRest] = React.useState(false)

  const [tracker, setTracker] = React.useState(timeTracker)
  const formRef = React.useRef<HTMLFormElement>(null)
  const fetcher = useFetcher()

  const isAdding =
    fetcher.submission &&
    fetcher.submission.formData.get('formType') === 'task' &&
    fetcher.submission.formData.get('id') === id
  const addFailed = fetcher.data?.error && fetcher.data.type == 'task'

  React.useEffect(() => {
    if (isAdding) {
      formRef.current?.reset()
      setEditing(false)
    }
  }, [isAdding])

  const isDeleting =
    fetcher.submission?.formData.get('id') === id &&
    fetcher.submission.formData.get('formType') === 'deleteTask'
  const deleteFailed = fetcher.data?.error && fetcher.data.type === 'delete'

  const completedCSS = 'line-through text-grey-700'

  return (
    <div
      className={`flex flex-row mb-2 pt-2 px-2 rounded ${
        editing
          ? 'border-2 border-transparent bg-grey-200 rounded shadow-lg'
          : 'border-2 border-transparent rounded'
      } ${(deleteFailed || addFailed) && 'border-red'} ${
        isDeleting && 'hidden'
      }`}
    >
      <CompleteCheckbox label="completed" id={id} status={completed} />
      <div>
        <fetcher.Form ref={formRef} method="post" action="/daily/planner">
          <input type="hidden" name="formType" value="task" />
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="timetracker" value={tracker} />
          <div className="p-2 grid grid-cols-10">
            <div className="flex flex-row items-center col-span-7  pr-4">
              <Input
                value={addFailed ? fetcher.data?.taskName : value}
                editing={editing}
                name="taskname"
                placeholder={placeholder}
                setEditing={setEditing}
                width="flex-grow"
                completed={completed ? completedCSS : ''}
              />
            </div>
            <div className="row-start-1 row-end-3 col-start-8 col-end-11">
              <div className="flex flex-row items-center">
                <Input
                  value={goalTime}
                  editing={editing}
                  name="goaltime"
                  placeholder=""
                  setEditing={setEditing}
                  width="w-14"
                />
                <div className="w-36 flex flex-row justify-center px-4">
                  <TimeTracker tracker={tracker} setTracker={setTracker} />
                </div>
                <Input
                  value={actualTime}
                  editing={editing}
                  name="actualtime"
                  placeholder=""
                  setEditing={setEditing}
                  width="w-14"
                />
                <div className="w-12 first:w-7 h-8 ml-4 text-purple flex justify-center">
                  {editing ? (
                    <button type="button" className="first:w-6 w-full">
                      <SaveIcon />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="first:w-6 w-full "
                      onClick={() => setEditing(true)}
                    >
                      <Edit />
                    </button>
                  )}
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
                  {editing ? 'Save' : 'Edit'}
                </div>
              </div>
            </div>
            <div className="flex flex-row mt-2 col-span-10 h-10">
              <div
                className={`${editing ? 'display' : 'hidden'} flex flex-row`}
              >
                <TaskSave />
                <TaskCancel setEditing={setEditing} />
              </div>
              <div className="flex items-center mb-1 mx-2 text-error">
                {addFailed ? `${fetcher.data?.message}` : ''}
              </div>
            </div>
          </div>
        </fetcher.Form>
      </div>

      {editing ? (
        <div className="w-12">
          <button
            onClick={() => setEditing(false)}
            className="first:w-6 w-full text-purple"
          >
            <CancelIcon />
          </button>
        </div>
      ) : (
        <fetcher.Form method="post" className="my-2">
          <div className="w-12 flex flex-col align-center">
            <input type="hidden" name="formType" value="deleteTask" />
            <input type="hidden" name="id" value={id} />
            <div className="flex flex-col items-center justify-end h-8">
              <button
                aria-label={deleteFailed ? 'Retry Delete' : 'Delete'}
                type="submit"
                className="first:w-6 w-full text-purple"
              >
                <DeleteIcon />
              </button>
            </div>
            <div>{deleteFailed ? 'Retry Delete' : 'Delete'}</div>
          </div>
        </fetcher.Form>
      )}
    </div>
  )
}
