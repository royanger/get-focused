import * as React from 'react'
interface Input {
  value: string
  name: string
  placeholder: string
  formState?: React.ReactChild
  setFormState: React.Dispatch<React.SetStateAction<string>>
}

export default function Input({
  value,
  name,
  placeholder,
  formState,
  setFormState,
}: Input) {
  // set some styles for the form for 'default' and 'edit' states
  // TODO probably add 'error' state later after form validation
  let defaultState =
    'border-0 border-b-[1px] border-purple border-opacity-50 outline-none focus:ring-0'
  let editState =
    'border-1 border-purple p-1 text-black rounded align-bottom focus:outline-none focus:border-2 focus:border-purple focus:ring-0'
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
        name={name}
        placeholder={placeholder}
        aria-label={placeholder}
        defaultValue={value}
        onClick={() => setFormState('edit')}
      />
    </div>
  )
}
