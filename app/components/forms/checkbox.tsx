export default function Checkbox({ checked, label }) {
  return (
    <>
      <input type="checkbox" defaultChecked={checked} /> {label}
    </>
  )
}
