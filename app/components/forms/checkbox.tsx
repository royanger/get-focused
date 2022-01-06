import { Checkbox } from '~/interfaces'

export default function Checkbox({ status, label }: Checkbox) {
  return (
    <>
      <label htmlFor={label.toLowerCase()}>
        <input
          name={label.toLowerCase()}
          type="checkbox"
          defaultChecked={status}
          className="outline-none focus:ring-0 border-[1px] border-pruple text-purple"
        />{' '}
        {label}
      </label>
    </>
  )
}
