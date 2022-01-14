import { Radio } from '~/interfaces'

export default function Radio({ value, checked, name }: Radio) {
  return (
    <>
      <input
        id={`${name}-${value}`}
        value={value}
        type="radio"
        name={name}
        defaultChecked={checked}
        className="outline-none focus:ring-0 border-[1px] border-purple text-purple"
        onClick={(e: React.MouseEvent<HTMLInputElement>) => handleChange(e)}
      />
      <label htmlFor={`${name}-${value}`}>{value}</label>
    </>
  )
}
