import Input from './input'
import TaskCheckbox from './taskCheckbox'
import TaskRadio from './taskRadio'
import TaskSave from './taskSave'
import TaskCancel from './taskCancel'

interface Tasks {
  id?: string
  completed?: boolean
  statusId?: string
  name: string
  actualTime?: string
  goalTime?: string
  timeTracker?: number
}

export default function TaskElement({ name }: Tasks) {
  return (
    <>
      <div>
        <div className="flex flex-row items-center">
          <Input value={name} />
          <TaskCheckbox />
          <div className="w-32 flex flex-row justify-center ">
            <TaskRadio />
            <TaskRadio />
            <TaskRadio />
            <TaskRadio />
            <TaskRadio />
          </div>
          <TaskCheckbox />
        </div>
        <div className="flex flex-row items-center">
          <div className="flex-grow"></div>
          <div className="text-xs w-8 flex flex-row justify-center ">
            Target
          </div>
          <div className="text-xs w-32 flex flex-row justify-center ">
            Track your time
          </div>
          <div className="text-xs w-8 flex flex-row justify-center ">
            Actual
          </div>
        </div>
      </div>
      <TaskSave />
      <TaskCancel />
    </>
  )
}
