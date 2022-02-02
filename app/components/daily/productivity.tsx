import * as React from 'react'
import { HeaderTwo } from '../Headlines'
import { Form, useTransition } from 'remix'
import Button from '../Button'

export default function Productivity({ entries, errors }: Productivity) {
  const transition = useTransition()
  const [rating, setRating] = React.useState(entries?.score ? entries.score : 0)

  const buttonState =
    transition.state === 'submitting' &&
    transition?.submission?.formData.get('formType') === 'productivity'
      ? { text: 'Saving', variant: 'warning' }
      : transition.state === 'loading' &&
        transition?.submission?.formData.get('formType') === 'productivity'
      ? { text: 'Saved!', variant: 'success' }
      : { text: 'Save', variant: 'default' }

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setRating(parseInt(event.currentTarget.id.split('-').slice(1).join('')))
  }

  // use the map index as key -- there shouldn't be a reorder
  const inputs = [...Array(10)].map((_, index) => {
    const filled = rating > index ? 'bg-purple' : 'bg-transparent'
    return (
      <div
        className={`border-2 border-purple rounded-full w-6 h-6 mr-4 ${filled}`}
        onClick={e => handleClick(e)}
        id={`productivity-${index + 1}`}
        tabIndex={0}
        key={index}
      >
        <span className="sr-only">{index + 1}</span>
      </div>
    )
  })

  return (
    <>
      <HeaderTwo>Productivity Score?</HeaderTwo>
      <p>Rate how you productive you felt out of 10.</p>
      <Form method="post" action="/daily/planner">
        <input type="hidden" name="formType" value="productivity" />
        <input
          type="hidden"
          value={entries?.id ? entries.id : 'new'}
          name="id"
        />
        <input type="hidden" name="rating" value={rating} />
        <div className="flex flex-direction">{inputs}</div>
        <Button
          type="submit"
          title={buttonState.text}
          variant={buttonState.variant}
        />
      </Form>
    </>
  )
}
