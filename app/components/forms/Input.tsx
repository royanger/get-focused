import * as React from 'react'

export default function Input({
  value,
  name,
  placeholder,
  editing,
  width,
  setEditing,
  completed,
}: Input) {
  return (
    <div className={`${width} flex`}>
      <input
        className={`${width} ${completed} ${
          editing
            ? 'border-1 border-grey-700 p-1 text-black rounded align-bottom focus:outline-none focus:border-purple-300 focus:ring-0'
            : 'border-[1px] border-b-purple border-l-transparent border-r-transparent border-t-transparent p-1 border-opacity-50 outline-none focus:ring-0 align-bottom font-input'
        }`}
        type="text"
        name={name}
        placeholder={placeholder}
        aria-label={placeholder}
        defaultValue={value}
        onClick={() => setEditing(true)}
      />
    </div>
  )
}
