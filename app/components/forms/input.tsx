import * as React from 'react'
interface Input {
  value: string
  formState?: React.ReactChild
}

export default function Input({ value, formState }: Input) {
  // set some styles for the form for 'default' and 'edit' states
  // TODO probably add 'error' state later after form validation
  let defaultState = 'border-0 border-b-[1px] border-purple border-opacity-50'
  let editState = 'border-1 border-purple p-1 text-black rounded align-bottom'
  let [currentState, setCurrentState] = React.useState(defaultState)

  React.useEffect(() => {
    if (formState === 'edit') setCurrentState(editState)
    if (formState === 'default') setCurrentState(defaultState)
  }, [formState, currentState])

  return (
    <div className="flex-grow flex">
      <input
        className={`flex-grow ${currentState}`}
        type="text"
        placeholder="Important Goals"
        aria-label="Important Goals"
        defaultValue={value}
      />
    </div>
  )
}
