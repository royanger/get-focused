import * as React from 'react'
import { Form, useFetcher, useSearchParams, useTransition } from 'remix'
import Button from '../button'

// components
import Input from '../forms/Input'
import TaskCancel from '../forms/TaskCancel'
import TaskSave from '../forms/TaskSave'

export default function ReviewSingleElement({
  id,
  value,
  placeholder,
  formType,
  reset,
  errors,
}: Reviews) {
  const [editing, setEditing] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)
  const transition = useTransition()
  const fetcher = useFetcher()

  const [searchParams] = useSearchParams()
  const paramWeek = searchParams.get('week')
  const paramYear = searchParams.get('year')

  const buttonState =
    transition.state === 'submitting' &&
    transition.submission?.formData.get('formType') === formType
      ? { text: 'Saving', variant: 'warning' }
      : transition.state === 'loading' &&
        transition?.submission?.formData.get('formType') === formType
      ? { text: 'Saved!', variant: 'success' }
      : { text: 'Save', variant: 'default' }

  //   React.useEffect(() => {
  //     setFormState('default')
  //   }, [isSubmitting])

  const deleteFailed = fetcher.data?.error

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
          </div>

          <div className={`${editing ? 'display' : 'hidden'} col-span-7`}>
            <Button
              type="submit"
              title={buttonState.text}
              variant={buttonState.variant}
            />
            <TaskSave />
            <TaskCancel setEditing={setEditing} />
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
