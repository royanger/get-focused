export default function Input() {
  return (
    <div className="flex-grow flex">
      <input
        className="border-2 border-purple p-2 text-black rounded flex-grow"
        type="text"
        placeholder="Important Goals"
        aria-label="Important Goals"
      />
    </div>
  )
}