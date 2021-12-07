//<input className="mx-2" type="radio" />

interface Radio {
  value?: number
  checked?: boolean
  name: string
}

export default function Radio({ value, checked, name }: Radio) {
  return (
    <input
      value={value}
      type="radio"
      name={`wellness-${name}`}
      defaultChecked={checked}
      className="outline-none focus:ring-0 border-[1px] border-pruple text-purple"
    />
  )
}
