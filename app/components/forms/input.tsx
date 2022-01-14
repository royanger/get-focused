import * as React from 'react'
import { Input } from '~/interfaces'

export default function Input({
  value,
  name,
  placeholder,
  formState,
  width,
  setFormState,
  completed,
}: Input) {
  // set some styles for the form for 'default' and 'edit' states
  // TODO probably add 'error' state later after form validation
  let defaultState =
    'border-[1px] border-b-purple border-l-transparent border-r-transparent border-t-transparent p-1 border-opacity-50 outline-none focus:ring-0 align-bottom'
  let editState =
    'border-1 border-grey-700 p-1 text-black rounded align-bottom focus:outline-none focus:border-purple-300 focus:ring-0'
  let [currentState, setCurrentState] = React.useState(defaultState)

  React.useEffect(() => {
    if (formState === 'edit') setCurrentState(editState)
    if (formState === 'default') setCurrentState(defaultState)
  }, [formState, currentState])

  return (
    <div className={`${width} flex`}>
      <input
        className={`${width} ${currentState} ${completed}`}
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
