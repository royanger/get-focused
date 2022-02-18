import * as React from 'react'
import { Form, useFetcher, useSearchParams, useTransition } from 'remix'

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
  const [editing, setEditing] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)
  const transition = useTransition()
  const fetcher = useFetcher()

  const [searchParams] = useSearchParams()
  const paramWeek = searchParams.get('week')
  const paramYear = searchParams.get('year')

  const isAdding =
    transition.submission &&
    transition.submission.formData.get('formType') === 'addWeeklyTask' &&
    transition.submission.formData.get('id') === id

  React.useEffect(() => {
    if (isAdding) {
      formRef.current?.reset()
    }
  })

  const isDeleting = fetcher.submission?.formData.get('id') === id
  const deleteFailed = fetcher.data?.error

  return (
    <li
      className={`p-4 border-2 rounded ${
        editing
          ? 'border-2 border-transparent bg-grey-200 rounded shadow-lg'
          : 'border-2 border-transparent rounded'
      } ${deleteFailed && 'border-red'}  ${isDeleting && 'hidden'}`}
    >
      <div className="flex flex-row">
        <div className="flex-grow">
          <Form
            ref={formRef}
            method="post"
            action={`/weekly/planner${
              paramWeek ? `?year=${paramYear}&week=${paramWeek}` : ''
            }`}
          >
            <input type="hidden" name="formType" value="addWeeklyTask" />
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="status" value={`status-${type}`} />

            <div className="flex flex-row items-center font-input">
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
            <div className={`${editing ? 'display' : 'hidden'} col-span-7`}>
              <TaskSave />
              <TaskCancel setEditing={setEditing} />
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
                  aria-label={deleteFailed ? 'Retry Delete' : 'Delete'}
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
