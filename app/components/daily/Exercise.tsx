import { Form, useSearchParams, useTransition } from '@remix-run/react'
import Button from '../Button'
import Radio from '../forms/Radio'
import { HeaderTwo } from '../Headlines'

export default function Exercise({ entries, errors }: Exercise) {
  const transition = useTransition()

  const [searchParams] = useSearchParams()
  const paramDate = searchParams.get('date')

  const buttonState =
    transition.state === 'submitting' &&
    transition?.submission?.formData.get('formType') === 'exercise'
      ? { text: 'Saving', variant: 'warning' }
      : transition.state === 'loading' &&
        transition?.submission?.formData.get('formType') === 'exercise'
      ? { text: 'Saved!', variant: 'success' }
      : { text: 'Save', variant: 'default' }

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
            value={entries?.id ? entries.id : 'new'}
          />
          <div>
            <div key="yes">
              <Radio
                value="yes"
                name="exercise"
                checked={entries?.completed ? !entries.completed : false}
              />
            </div>
            <div key="no">
              <Radio
                value="no"
                name="exercise"
                checked={entries?.completed ? !entries.completed : false}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              title={buttonState.text}
              variant={buttonState.variant}
            />
          </div>
        </div>
        {errors
          ? `<div className="text-sm text-error mb-6 h-5">${errors.message}</div>`
          : ''}
      </Form>
    </div>
  )
}