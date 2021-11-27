export default function Checkbox({ checked, label }) {
  return (
    <>
      <input type="checkbox" checked={checked} /> {label}
    </>
  )
}
