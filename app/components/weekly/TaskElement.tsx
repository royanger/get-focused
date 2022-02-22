import * as React from 'react'
import { useFetcher, useSearchParams } from 'remix'

// components
import Checkbox from '../forms/Checkbox'
import Input from '../forms/Input'

// icons
import CancelIcon from '../icons/CancelIcon'
import DeleteIcon from '../icons/DeleteIcon'
import Edit from '../icons/EditIcon'
import SaveIcon from '../icons/SaveIcon'
import SyncIcon from '../icons/SyncIcon'

export default function TaskElement({
  id,
  placeholder,
  completed,
  value,
  type,
  saving,
  visibility,
}: WeeklyTaskElement) {
  const [editing, setEditing] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)
  const fetcher = useFetcher()

  const [searchParams] = useSearchParams()
  const paramWeek = searchParams.get('week')
  const paramYear = searchParams.get('year')

  const isAdding =
    fetcher.submission &&
    fetcher.submission.formData.get('formType') === 'addWeeklyTask' &&
    fetcher.submission.formData.get('id') === id

  React.useEffect(() => {
    if (isAdding) {
      formRef.current?.reset()
      if (fetcher.state === 'loading') {
        setEditing(false)
      }
    }
  }, [isAdding, fetcher])

  const isDeleting = fetcher.submission?.formData.get('id') === id
  const deleteFailed = fetcher.data?.error

  function handleReset() {
    setEditing(false)
    formRef.current?.reset()
  }

  return (
    <li
      className={`p-4 border-2 rounded ${
        editing
          ? 'border-2 border-transparent bg-grey-200 rounded shadow-lg'
          : 'border-2 border-transparent rounded'
      } ${deleteFailed && 'border-red'}  ${
        isDeleting && 'hidden'
      } ${visibility}`}
    >
      <div className="flex flex-row">
        <div className="flex-grow">
          <fetcher.Form
            ref={formRef}
            method="post"
            action={`/weekly/planner${
              paramWeek ? `?year=${paramYear}&week=${paramWeek}` : ''
            }`}
          >
            <div className="flex-grow flex flex-row">
              <div className="flex-grow flex flex-row">
                <input type="hidden" name="formType" value="addWeeklyTask" />
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="status" value={`status-${type}`} />

                <div className="flex flex-row flex-grow items-center font-input">
                  <Checkbox status={completed} label="Completed" />
                  <Input
                    value={value}
                    editing={editing}
                    name="taskname"
                    placeholder={placeholder}
                    setEditing={setEditing}
                    width="flex-grow"
                  />
                </div>
              </div>
              <div>
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
                      {saving ? (
                        <SyncIcon className="h-6 text-purple animate-spin" />
                      ) : (
                        <Edit className="h-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </fetcher.Form>
        </div>
        <div className="flex flex-col items-center justify-start w-12">
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
              <div className="w-12">
                <input type="hidden" name="formType" value="deleteWeeklyTask" />
                <input type="hidden" name="id" value={id} />
                <div className="flex flex-col items-center justify-start h-8">
                  <button
                    aria-label={deleteFailed ? 'Retry Delete' : 'Delete'}
                    type="submit"
                    className="first:w-6 w-full text-purple"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </li>
  )
}
