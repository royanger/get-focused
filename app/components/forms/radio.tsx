//<input className="mx-2" type="radio" />

interface Radio {
  value?: number
  checked?: boolean
  name: number
  type: string
}

export default function Radio({
  value,
  checked,
  name,
  type,
  handleChange,
}: Radio) {
  return (
    <input
      value={value}
      type="radio"
      name={`${type}-${name}`}
      defaultChecked={checked}
      className="outline-none focus:ring-0 border-[1px] border-purple text-purple"
      onClick={e => handleChange(e)}
    />
  )
}
