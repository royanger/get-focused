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
      <div>
        <Checkbox
          status={entries?.completed ? entries.completed : false}
          label="Yes"
        />
      </div>
      <div>
        <Checkbox
          status={entries?.completed ? !entries.completed : false}
          label="No"
        />
      </div>
    </div>
  )
}
