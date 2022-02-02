import * as React from 'react'
import { Form, useTransition } from 'remix'

// components
import Input from '../forms/Input'
import TaskCancel from '../forms/TaskCancel'
import TaskSave from '../forms/TaskSave'

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

  let defaultDiv = 'border-0 rounded '
  let editDiv = 'border-0 bg-grey-200 rounded shadow-lg'
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

  function clickHandler() {
    setFormState('edit')
  }

  return (
    <div className={`p-4 ${currentStateDiv}`}>
      <Form ref={formRef} method="post" action="/weekly/review">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="formType" value={formType} />

        <div className="flex flex-row items-center font-input">
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
  )
}
