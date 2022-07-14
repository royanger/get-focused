import * as React from 'react'
import {
  Form,
  useFetcher,
  useSearchParams,
  useTransition,
} from '@remix-run/react'

// components
import Input from '../forms/Input'
import { CancelIcon, DeleteIcon, SaveIcon, SyncIcon } from '../icons'

export default function ReviewElement({
  id,
  value,
  placeholder,
  formType,
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
    transition.submission?.formData.get('formType') === formType

  React.useEffect(() => {
    formRef.current?.reset()
  }, [isAdding])

  const isSubmitting =
    transition.state === 'submitting' &&
    transition.submission?.formData.get('formType') === formType

  React.useEffect(() => {
    formRef.current?.reset()
    if (transition.state === 'idle') {
      setEditing(false)
    }
  }, [isSubmitting, transition.state])

  const isDeleting = fetcher.submission?.formData.get('id') === id
  const deleteFailed = fetcher.data?.error

  function handleReset() {
    setEditing(false)
    formRef.current?.reset()
  }

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
          id={`form-${id}`}
          ref={formRef}
          method="post"
          action={`/weekly/review${
            paramWeek ? `?year=${paramYear}&week=${paramWeek}` : ''
          }`}
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="formType" value={formType} />

          <div className="flex flex-row flex-grow items-center font-input ">
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
        </Form>
        <div className="w-16 h-full text-purple grid grid-cols-2">
          <div className="w-full flex flex-row items-center justify-center">
            {editing ? (
              isSubmitting ? (
                <SyncIcon className="w-6 animate-spin" />
              ) : (
                <button
                  type="submit"
                  form={`form-${id}`}
                  className="w-ful flex flex-col items-center"
                >
                  <SaveIcon className="h-6" />
                </button>
              )
            ) : (
              ''
            )}
          </div>
          <div className="w-full flex flex-row items-center justify-center">
            {editing ? (
              <button type="button" onClick={() => handleReset()}>
                <CancelIcon className="h-6" />
              </button>
            ) : (
              <fetcher.Form method="post">
                <input
                  type="hidden"
                  name="formType"
                  value={`delete${formType}`}
                />
                <input type="hidden" name="id" value={id} />
                <div className="flex flex-col items-center justify-start">
                  <button
                    aria-label={deleteFailed ? 'Retry Delete' : 'Delete'}
                    type="submit"
                    className="w-full text-purple"
                  >
                    <DeleteIcon className="h-6" />
                  </button>
                </div>
              </fetcher.Form>
            )}
          </div>
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
