import * as React from 'react'
import { Form, useFetcher, useTransition } from 'remix'

// components
import Input from '../forms/Input'
import TaskCancel from '../forms/TaskCancel'
import TaskSave from '../forms/TaskSave'
import DeleteIcon from '../icons/delete'

export default function ReviewElement({
  id,
  value,
  placeholder,
  formType,
  reset,
}: Reviews) {
  const [formState, setFormState] = React.useState('default')
  const formRef = React.useRef<HTMLFormElement>(null)
  const transition = useTransition()
  const fetcher = useFetcher()

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

  let defaultDiv = 'border-2 border-transparent rounded '
  let editDiv = 'border-2 border-transparent bg-grey-200 rounded shadow-lg'
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

  React.useEffect(() => {
    console.log('isDeleting', isDeleting)
  }, [isDeleting])

  return (
    <div
      className={`p-4 flex flex-row flex-grow ${currentStateDiv} ${
        deleteFailed && 'border-red'
      } ${isDeleting && 'hidden'}`}
    >
      <Form
        className="flex-grow"
        ref={formRef}
        method="post"
        action="/weekly/review"
      >
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="formType" value={formType} />

        <div className="flex flex-row flex-grow items-center font-input">
          <Input
            value={value}
            formState={formState}
            name="item"
            placeholder={placeholder}
            setFormState={setFormState}
            width="flex-grow"
            aria-label={value ? value : placeholder}
          />
        </div>

        <div className={`${currentStateButtons} col-span-7`}>
          <TaskSave />
          <TaskCancel setFormState={setFormState} />
        </div>
      </Form>
      <div>
        <fetcher.Form method="post">
          <div className="w-12">
            <input type="hidden" name="formType" value={`delete${formType}`} />
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
  )
}
