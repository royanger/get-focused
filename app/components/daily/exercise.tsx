import { Form, useTransition } from 'remix'
import Button from '../Button'
import Radio from '../forms/Radio'
import { HeaderTwo } from '../headlines'

export default function Exercise({ entries, errors }: Exercise) {
  const transition = useTransition()
  const buttonState =
    transition.state === 'submitting' &&
    transition?.submission?.formData.get('formType') === 'exercise'
      ? { text: 'Saving', variant: 'warning' }
      : transition.state === 'loading' &&
        transition?.submission?.formData.get('formType') === 'exercise'
      ? { text: 'Saved!', variant: 'success' }
      : { text: 'Save', variant: 'default' }

  return (
    <div className="mb-4">
      <HeaderTwo>Did you exercise today?</HeaderTwo>
      <Form method="post" action="/daily/planner">
        <div className="grid grid-cols-2">
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

          <div className="col-start-2 col-end-2 row-start-1 row-end-3">
            <Button
              type="submit"
              title={buttonState.text}
              variant={buttonState.variant}
            />
          </div>
        </div>
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.error : ''}
        </div>
      </Form>
    </div>
  )
}
