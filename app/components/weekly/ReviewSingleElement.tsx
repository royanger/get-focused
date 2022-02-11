import * as React from 'react'
import { Form, useFetcher, useTransition } from 'remix'

// components
import Input from '../forms/Input'
import TaskCancel from '../forms/TaskCancel'
import TaskSave from '../forms/TaskSave'
import DeleteIcon from '../icons/delete'

export default function ReviewSingleElement({
  id,
  value,
  placeholder,
  formType,
  reset,
  errors,
}: Reviews) {
  const [formState, setFormState] = React.useState('default')
  const formRef = React.useRef<HTMLFormElement>(null)
  const transition = useTransition()
  const fetcher = useFetcher()

  const isSubmitting =
    transition.state === 'submitting' &&
    transition.submission?.formData.get('formType') === formType

  React.useEffect(() => {
    setFormState('default')
  }, [isSubmitting])

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

  return (
    <div className={`flex flew-grow flex-row ${deleteFailed && 'border-red'}`}>
      <div className={`p-4 flex flex-row flex-grow ${currentStateDiv}`}>
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
      </div>
      {errors && errors.id === id ? (
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.msg : ''}
        </div>
      ) : null}
    </div>
  )
}
