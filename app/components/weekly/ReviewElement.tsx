import * as React from 'react'
import { Form, useFetcher, useSearchParams, useTransition } from 'remix'

// components
import Input from '../forms/Input'
import TaskCancel from '../forms/TaskCancel'
import TaskSave from '../forms/TaskSave'
import DeleteIcon from '../icons/DeleteIcon'

export default function ReviewElement({
  id,
  value,
  placeholder,
  formType,
  reset,
  errors,
}: Reviews) {
  //   const [formState, setFormState] = React.useState('default')
  const [editing, setEditing] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)
  const transition = useTransition()
  const fetcher = useFetcher()

  const [searchParams] = useSearchParams()
  const paramWeek = searchParams.get('week')
  const paramYear = searchParams.get('year')

  const isAdding =
    transition.state === 'submitting' &&
    transition.submission?.formData.get('formType') === formType &&
    reset === true

  React.useEffect(() => {
    formRef.current?.reset()
  }, [isAdding])

  const isSubmitting =
    transition.state === 'submitting' &&
    transition.submission?.formData.get('formType') === formType

  React.useEffect(() => {
    formRef.current?.reset()
  }, [isSubmitting])

  const isDeleting = fetcher.submission?.formData.get('id') === id
  const deleteFailed = fetcher.data?.error

  return (
    <div
      className={`flex flew-grow flex-row ${deleteFailed && 'border-red'} ${
        isDeleting && 'hidden'
      }`}
    >
      <div
        className={`p-4 flex flex-row flex-grow ${
          editing
            ? 'border-2 border-transparent bg-grey-200 rounded shadow-lg'
            : 'border-2 border-transparent rounded'
        }`}
      >
        <Form
          className="flex-grow"
          ref={formRef}
          method="post"
          action={`/weekly/review${
            paramWeek ? `?year=${paramYear}&week=${paramWeek}` : ''
          }`}
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="formType" value={formType} />

          <div className="flex flex-row flex-grow items-center font-input">
            <Input
              value={value}
              editing={editing}
              name="item"
              placeholder={placeholder}
              setEditing={setEditing}
              width="flex-grow"
              aria-label={value ? value : placeholder}
            />
          </div>

          <div className={`${editing ? 'display' : 'hidden'} col-span-7`}>
            <TaskSave />
            <TaskCancel setEditing={setEditing} />
          </div>
        </Form>
        <div>
          <fetcher.Form method="post">
            <div className="w-12">
              <input
                type="hidden"
                name="formType"
                value={`delete${formType}`}
              />
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
      {errors && errors.id === id ? (
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.message : ''}
        </div>
      ) : null}
    </div>
  )
}
