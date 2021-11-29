import CheckboxThing from '../forms/checkbox'
import { HeaderTwo } from '../headlines'

interface Exercise {
  entries: {
    completed?: boolean
  }
}

export default function Exercise({ entries }: Exercise) {
  return (
    <>
      <HeaderTwo>Did you exercise today?</HeaderTwo>
      <div>
        <CheckboxThing status={entries.completed} label="exercise-yes" />
      </div>
      <div>
        <CheckboxThing status={!entries.completed} label="exercise-no" />
      </div>
    </>
  )
}
