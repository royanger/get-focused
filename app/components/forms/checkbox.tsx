interface Checkbox {
  status?: boolean
  label: string
}

export default function Checkbox({ status, label }: Checkbox) {
  return (
    <>
      <label htmlFor={label}>
        <input name={label} type="checkbox" defaultChecked={status} /> {label}
      </label>
    </>
  )
}
