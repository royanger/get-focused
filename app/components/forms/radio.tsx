//<input className="mx-2" type="radio" />

interface Radio {
  value?: number
  checked?: boolean
}

export default function Radio({ value, checked }: Radio) {
  return (
    <input
      value={value}
      type="radio"
      defaultChecked={checked}
      className="outline-none focus:ring-0 border-[1px] border-pruple text-purple"
    />
  )
}
