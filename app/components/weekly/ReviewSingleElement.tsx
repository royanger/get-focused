import * as React from 'react'
import {
  Form,
  useFetcher,
  useSearchParams,
  useTransition,
} from '@remix-run/react'

// components
import Input from '../forms/Input'
import { SaveIcon, CancelIcon, SyncIcon } from '../icons'

export default function ReviewSingleElement({
  id,
  value,
  placeholder,
  formType,
  errors,
}: Reviews) {
  const [editing, setEditing] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)
  const transition = useTransition()
  const fetcher = useFetcher()

  const [searchParams] = useSearchParams()
  const paramWeek = searchParams.get('week')
  const paramYear = searchParams.get('year')

  const isSubmitting =
    (transition.state === 'submitting' || transition.state === 'loading') &&
    transition.submission?.formData.get('formType') === formType

  React.useEffect(() => {
    if (transition.state === 'idle') {
      setEditing(false)
    }
  }, [transition])

  const deleteFailed = fetcher.data?.error

  function handleReset() {
    setEditing(false)
    formRef.current?.reset()
  }

  return (
    <div className={`flex flew-grow flex-row ${deleteFailed && 'border-red'}`}>
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

            <div
              className={`w-12 h-full text-purple flex justify-center items-center col-span-7`}
            >
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
            </div>
            <div className={`${editing ? 'display' : 'hidden'} col-span-7`}>
              <button
                type="button"
                className="w-full text-purple flex flex-col items-center"
                onClick={() => handleReset()}
              >
                <CancelIcon className="h-6" />
              </button>
            </div>
          </div>
        </Form>
      </div>
      {errors && errors.id === id ? (
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.message : ''}
        </div>
      ) : null}
    </div>
  )
}
