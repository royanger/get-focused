import * as React from 'react'
import { Form, useSearchParams, useTransition } from '@remix-run/react'
import Button from '../Button'
import { HeaderTwo } from '../Headlines'

export default function Exercise({ exercise, errors }: Exercise) {
  const [status, setStatus] = React.useState<boolean | undefined>()
  //  exercise?.completed ? exercise.completed : undefined
  const transition = useTransition()

  React.useEffect(() => {
    if (exercise !== undefined) {
      setStatus(exercise?.completed)
    } else if (exercise === undefined) {
      setStatus(undefined)
    }
  }, [exercise])

  const [searchParams] = useSearchParams()
  const paramDate = searchParams.get('date')

  const buttonState =
    transition.state === 'submitting' &&
    transition?.submission?.formData.get('formType') === 'exercise'
      ? { text: 'Saving', variant: 'saving' }
      : transition.state === 'loading' &&
        transition?.submission?.formData.get('formType') === 'exercise'
      ? { text: 'Saved!', variant: 'saved' }
      : { text: 'Save', variant: 'default' }

  const handleChange = (newStatus: boolean) => {
    setStatus(newStatus)
  }

  const yesStatus =
    status !== undefined ? (status === true ? true : false) : false
  const noStatus =
    status !== undefined ? (status === false ? true : false) : false

  return (
    <div className="m-2 p-3 border-0 rounded-lg shadow-md shadow-purple-100">
      <HeaderTwo>Did you exercise today?</HeaderTwo>
      <Form
        method="post"
        action={`/daily/planner${paramDate ? `?date=${paramDate}` : ''}`}
      >
        <div>
          <input type="hidden" name="formType" value="exercise" />
          <input
            type="hidden"
            name="id"
            value={exercise?.id ? exercise.id : 'new'}
          />
          <div>
            <div>
              <input
                id="exercise-yes"
                value="yes"
                type="radio"
                name="exercise"
                checked={yesStatus}
                className="outline-none focus:ring-0 border-[1px] border-purple text-purple"
                onChange={() => handleChange(true)}
              />
              <label htmlFor="exercise-yes">Yes</label>
            </div>
            <div>
              <input
                id="exercise-no"
                value="no"
                type="radio"
                name="exercise"
                checked={noStatus}
                className="outline-none focus:ring-0 border-[1px] border-purple text-purple"
                onChange={() => handleChange(false)}
              />
              <label htmlFor="exercise-no">No</label>
            </div>
          </div>

          <div className="mt-8 flex flex-row items-center justify-center">
            <div>
              <Button
                type="submit"
                title={buttonState.text}
                variant={buttonState.variant}
                size="sm"
              />
            </div>
            <div className="text-sm text-error ml-4 h-5 grow">
              {errors ? errors.message : ''}
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}
