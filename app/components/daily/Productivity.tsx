import * as React from 'react'
import { HeaderTwo } from '../Headlines'
import { Form, useSearchParams, useTransition } from '@remix-run/react'
import Button from '../Button'

export default function Productivity({ entries, errors }: Productivity) {
  const transition = useTransition()
  const [rating, setRating] = React.useState(entries?.score ? entries.score : 0)
  const [searchParams] = useSearchParams()
  const paramDate = searchParams.get('date')

  const buttonState =
    transition.state === 'submitting' &&
    transition?.submission?.formData.get('formType') === 'productivity'
      ? { text: 'Saving', variant: 'saving' }
      : transition.state === 'loading' &&
        transition?.submission?.formData.get('formType') === 'productivity'
      ? { text: 'Saved!', variant: 'saved' }
      : { text: 'Save', variant: 'default' }

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setRating(parseInt(event.currentTarget.id.split('-').slice(1).join('')))
  }

  // use the map index as key -- there shouldn't be a reorder
  const inputs = [...Array(10)].map((_, index) => {
    const filled = rating > index ? 'bg-purple' : 'bg-transparent'
    return (
      <div
        className={`border-2 border-purple rounded-full w-5 h-5 mr-4 ${filled}`}
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
    <div className="m-2 mt-8 p-3 border-0 rounded-lg shadow-md shadow-purple-100">
      <HeaderTwo>Productivity Score?</HeaderTwo>
      <p className="mb-4">Rate how you productive you felt out of 10.</p>
      <Form
        method="post"
        action={`/daily/planner${paramDate ? `?date=${paramDate}` : ''}`}
      >
        <input type="hidden" name="formType" value="productivity" />
        <input
          type="hidden"
          value={entries?.id ? entries.id : 'new'}
          name="id"
        />
        <input type="hidden" name="rating" value={rating} />
        <div className="flex flex-direction mb-8">{inputs}</div>
        <Button
          type="submit"
          title={buttonState.text}
          variant={buttonState.variant}
        />
      </Form>
    </div>
  )
}
