import Input from './input'
import TaskCheckbox from './taskCheckbox'
import TaskRadio from './taskRadio'
import TaskSave from './taskSave'
import TaskCancel from './taskCancel'

export default function TaskElement() {
  return (
    <>
      <div>
        <div className="flex flex-row items-center">
          <Input />
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
