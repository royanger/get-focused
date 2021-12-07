import { Form } from 'remix'
import Button from '../button'
import Checkbox from '../forms/checkbox'
import { HeaderTwo } from '../headlines'

interface Exercise {
  entries: {
    completed?: boolean
  }
}

export default function Exercise({ entries }: Exercise) {
  return (
    <div className="mb-4">
      <HeaderTwo>Did you exercise today?</HeaderTwo>
      <Form method="post" action="/daily/planner">
        <div className="grid grid-cols-2">
          <input type="hidden" name="formType" value="exercise" />
          <div>
            <Checkbox
              status={entries?.completed ? entries.completed : false}
              label="Yes"
            />
          </div>
          <div className="col-start-2 col-end-2 row-start-1 row-end-3">
            <Button type="submit" title="save" />
          </div>
          <div>
            <Checkbox
              status={entries?.completed ? !entries.completed : false}
              label="No"
            />
          </div>
        </div>
      </Form>
    </div>
  )
}
