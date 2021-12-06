interface Checkbox {
  status?: boolean
  label: string
}

export default function Checkbox({ status, label }: Checkbox) {
  return (
    <>
      <label htmlFor={label}>
        <input
          name={label}
          type="checkbox"
          defaultChecked={status}
          className="outline-none focus:ring-0 border-[1px] border-pruple text-purple"
        />{' '}
        {label}
      </label>
    </>
  )
}
