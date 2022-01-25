import { Checkbox } from '~/interfaces'
import Checkbox from './checkbox'

export default function CompleteCheckbox({ status, label }: Checkbox) {
  return (
    <div className="w-12 first:w-7 text-purple h-auto flex justify-center">
      <form method="post" className="border-2 border-x-red m-2 ">
        <Checkbox status={status} label={label} />
      </form>
    </div>
  )
}
