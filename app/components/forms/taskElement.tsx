import * as React from 'react'
import Input from './Input'
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
  timeTracker,
  type,
  completed,
}: TaskElement) {
  // 'editing' controls changes for all elements. Pass these as a prop as needed
  const [editing, setEditing] = React.useState(false)
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
      if (fetcher.state === 'loading') {
        setEditing(false)
      }
    }
  }, [isAdding, fetcher])

  const isDeleting =
    fetcher.submission?.formData.get('id') === id &&
    fetcher.submission.formData.get('formType') === 'deleteTask'
  const deleteFailed = fetcher.data?.error && fetcher.data.type === 'delete'

  function handleReset() {
    setEditing(false)
    formRef.current?.reset()
  }

  return (
    <div
      className={`flex flex-row pt-2 px-2 rounded  w-full ${
        editing
          ? 'border-2 border-transparent bg-grey-200 rounded shadow-lg'
          : 'border-2 border-transparent rounded'
      } ${(deleteFailed || addFailed) && 'border-red'} ${
        isDeleting && 'hidden'
      }`}
    >
      <div className="">
        <CompleteCheckbox label="completed" id={id} status={completed} />
      </div>
      <div className=" grow">
        <fetcher.Form ref={formRef} method="post" action="/daily/planner">
          <input type="hidden" name="formType" value="task" />
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="timetracker" value={tracker} />

          <div className="p-2 flex flex-row ">
            <div className="grow">
              <div>
                <Input
                  value={addFailed ? fetcher.data?.taskName : value}
                  editing={editing}
                  name="taskname"
                  placeholder={placeholder}
                  setEditing={setEditing}
                  width="flex-grow"
                  completed={completed ? 'line-through text-grey-700' : ''}
                />
              </div>
              <div className=" text-red">
                {addFailed ? `${fetcher.data?.message}` : ''}
              </div>
            </div>
            <div className="w-24 flex flex-col items-center justify-center">
              <div>
                <Input
                  value={goalTime}
                  editing={editing}
                  name="goaltime"
                  placeholder=""
                  setEditing={setEditing}
                  width="w-14"
                  completed={completed ? 'line-through text-grey-700' : ''}
                />
              </div>
              <div className="text-sm h-6">Est. Time</div>
            </div>
            <div className="w-36 flex flex-col items-center justify-end px-4 ">
              <div>
                <TimeTracker
                  tracker={tracker}
                  setTracker={setTracker}
                  setEditing={setEditing}
                />
              </div>
              <div className="text-sm w-36 flex flex-row justify-center h-6">
                {tracker < 1
                  ? 'Track your time'
                  : `${Math.floor(((tracker * 25) / 60) % 60)}h ${
                      tracker * 25 - Math.floor(((tracker * 25) / 60) % 60) * 60
                    }m `}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="w-12 h-full text-purple flex justify-center items-end">
                <button
                  type="submit"
                  className={`w-full flex flex-col items-center ${
                    editing ||
                    id === 'newtask-p1' ||
                    id === 'newtask-p2' ||
                    id === 'newtask-p3'
                      ? 'display'
                      : 'hidden'
                  }`}
                >
                  <SaveIcon className="h-6" />
                  <span className="h-6 text-sm ">Save</span>
                </button>

                <button
                  type="button"
                  className={`w-full flex flex-col items-center ${
                    editing ||
                    id === 'newtask-p1' ||
                    id === 'newtask-p2' ||
                    id === 'newtask-p3'
                      ? 'hidden'
                      : 'display'
                  }`}
                  onClick={() => setEditing(true)}
                >
                  <Edit className="h-6" />
                  <span className="text-sm h-6">Edit</span>
                </button>
              </div>
            </div>
          </div>
        </fetcher.Form>
      </div>
      <div className="flex flex-col items-center justify-end m-2">
        <div
          className={`w-12 ${
            editing ||
            id === 'newtask-p1' ||
            id === 'newtask-p2' ||
            id === 'newtask-p3'
              ? 'display'
              : 'hidden'
          }`}
        >
          <button
            onClick={() => handleReset()}
            className="w-full text-purple flex flex-col items-center"
          >
            <CancelIcon className="h-6" />
            <span className="text-sm h-6">Cancel</span>
          </button>
        </div>

        <div
          className={`w-12 flex flex-col align-center justify-center ${
            editing ||
            id === 'newtask-p1' ||
            id === 'newtask-p2' ||
            id === 'newtask-p3'
              ? 'hidden'
              : 'display'
          }`}
        >
          <fetcher.Form method="post">
            <input type="hidden" name="formType" value="deleteTask" />
            <input type="hidden" name="id" value={id} />
            <button
              aria-label={deleteFailed ? 'Retry Delete' : 'Delete'}
              type="submit"
              className="w-full text-purple flex flex-col items-center"
            >
              <DeleteIcon className="w-6" />
              <span className="text-sm h-6">
                {deleteFailed ? 'Retry' : 'Delete'}
              </span>
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  )
}
