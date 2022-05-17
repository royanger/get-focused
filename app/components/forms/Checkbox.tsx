export default function Checkbox({ status, label, handleClick }: Checkbox) {
  return (
    <>
      <label htmlFor={label.toLowerCase()} className="sr-only">
        {label}
      </label>
      <input
        name={label.toLowerCase()}
        type="checkbox"
        defaultChecked={status}
        className="outline-none focus:ring-0 border-[1px] border-purple text-purple mr-2"
        onClick={e => handleClick(e)}
      />
    </>
  )
}
