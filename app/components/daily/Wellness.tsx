import * as React from 'react'
import { Form, useSearchParams, useTransition } from '@remix-run/react'
import Button from '../Button'
import { HeaderTwo } from '../Headlines'

export default function Wellness({ wellness, errors }: Wellness) {
  const transition = useTransition()
  const [score, setScore] = React.useState(
    wellness?.rating ? wellness.rating : 0
  )
  const [searchParams] = useSearchParams()
  const paramDate = searchParams.get('date')

  React.useEffect(() => {
    setScore(wellness?.rating ? wellness.rating : 0)
  }, [wellness])

  const buttonState =
    transition.state === 'submitting' &&
    transition?.submission?.formData.get('formType') === 'wellness'
      ? { text: 'Saving', variant: 'saving' }
      : transition.state === 'loading' &&
        transition?.submission?.formData.get('formType') === 'wellness'
      ? { text: 'Saved!', variant: 'saved' }
      : { text: 'Save', variant: 'default' }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setScore(parseInt(e.currentTarget.id.split('-').slice(1).join('')))
  }

  // use the map index as key -- there shouldn't be a reorder
  const inputs = [...Array(10)].map((_, index) => {
    const filled = score > index ? 'bg-purple' : 'bg-transparent'
    return (
      <div
        className={`border-2 border-purple rounded-full w-5 h-5 mr-4 ${filled}`}
        onClick={e => handleClick(e)}
        id={`wellness-${index + 1}`}
        tabIndex={0}
        key={index}
      >
        <span className="sr-only">{index + 1}</span>
      </div>
    )
  })

  return (
    <div className="m-2 p-3 border-0 rounded-lg shadow-md shadow-purple-100">
      <HeaderTwo>How do you feel?</HeaderTwo>
      <p className="mb-4">Rate how you are feeling out of 10.</p>
      <Form
        method="post"
        action={`/daily/planner${paramDate ? `?date=${paramDate}` : ''}`}
      >
        <input type="hidden" name="formType" value="wellness" />
        <input
          type="hidden"
          value={wellness?.id ? wellness.id : 'new'}
          name="id"
        />
        <input type="hidden" name="rating" value={score} />
        <div className="flex flex-direction mb-8">{inputs}</div>
        <Button
          type="submit"
          title={buttonState.text}
          variant={buttonState.variant}
          width="w-28"
          size="sm"
        />
      </Form>
    </div>
  )
}
