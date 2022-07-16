import * as React from 'react'
import {
  Form,
  useFetcher,
  useSearchParams,
  useTransition,
} from '@remix-run/react'

// components
import Input from '../forms/Input'

// icons
import { CancelIcon, DeleteIcon, EditIcon, SaveIcon, SyncIcon } from '../icons'
import CompleteCheckbox from '../forms/CompleteCheckbox'

export default function TaskElement({
  id,
  placeholder,
  completed,
  value,
  type,
  visibility,
}: WeeklyTaskElement) {
  const [editing, setEditing] = React.useState(false)
  const [completedStatus, setCompletedStatus] = React.useState(
    completed ? completed : false
  )
  const formRef = React.useRef<HTMLFormElement>(null)
  const fetcher = useFetcher()

  const [searchParams] = useSearchParams()
  const paramWeek = searchParams.get('week')
  const paramYear = searchParams.get('year')

  const transition = useTransition()

  const isSubmitting =
    transition.state === 'submitting' &&
    transition.submission?.formData.get('formType') === 'weeklyTask'

  React.useEffect(() => {
    formRef.current?.reset()
    setEditing(false)
  }, [isSubmitting])

  const isDeleting =
    fetcher.submission?.formData.get('id') === id &&
    fetcher.submission.formData.get('formType') === 'deleteWeeklyTask'
  const deleteFailed = fetcher.data?.error

  function handleReset() {
    setEditing(false)
    formRef.current?.reset()
  }

  return (
    <li
      className={`py-4 border-2 rounded ${
        editing
          ? 'border-2 border-transparent bg-grey-200 shadow-lg'
          : 'border-2 border-transparent '
      } ${deleteFailed ? 'border-red' : ''}  ${
        isDeleting ? 'hidden' : ''
      } ${visibility}`}
    >
      <div className="flex flex-row">
        <div className="flex-grow">
          <div className="flex-grow flex flex-row">
            <div className="flex flex-row">
              <div className="flex flex-row items-center font-input">
                <CompleteCheckbox
                  label="completed"
                  id={id}
                  status={completedStatus}
                  setCompletedStatus={setCompletedStatus}
                  paramString={`/weekly/planner${
                    paramWeek && paramYear
                      ? `?year=${paramYear}&week=${paramWeek}`
                      : ''
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-grow">
              <Form
                className="flex flex-grow"
                ref={formRef}
                method="post"
                action={`/weekly/planner${
                  paramWeek ? `?year=${paramYear}&week=${paramWeek}` : ''
                }`}
              >
                <div className="flex flex-row flex-grow justify-center">
                  <div className="flex flex-grow">
                    <input type="hidden" name="formType" value="weeklyTask" />
                    <input type="hidden" name="id" value={id} />
                    <input
                      type="hidden"
                      name="status"
                      value={`status-${type}`}
                    />
                    <div className="flex flex-row flex-grow items-center font-input">
                      <Input
                        value={value}
                        editing={editing}
                        name="taskname"
                        placeholder={placeholder}
                        setEditing={setEditing}
                        width="flex-grow"
                        completed={
                          completedStatus ? 'line-through text-grey-700' : ''
                        }
                      />
                    </div>
                  </div>
                  <div className="w-12 h-full text-purple flex justify-center items-end">
                    <button
                      type="submit"
                      className={`w-full flex flex-col items-center ${
                        editing ? 'display' : 'hidden'
                      }`}
                    >
                      {isSubmitting ? (
                        <SyncIcon className="h-6 text-purple animate-spin" />
                      ) : (
                        <SaveIcon className="h-6" />
                      )}
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
                      {id === 'addingtask-p1' ||
                      id === 'addingtask-p2' ||
                      id === 'addingtask-p3' ||
                      (isSubmitting &&
                        transition.submission?.formData.get('id') === id) ? (
                        <SyncIcon className="h-6 text-purple animate-spin" />
                      ) : (
                        <EditIcon className="h-6" />
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end w-12">
          <div className={`w-12 ${editing ? 'display' : 'hidden'}`}>
            <button
              type="button"
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
                <div className="flex flex-col items-center justify-end h-8">
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
