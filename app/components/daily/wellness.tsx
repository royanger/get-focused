import * as React from 'react'
import { Form, useTransition } from 'remix'
import Button from '../Button'
import { HeaderTwo } from '../headlines'

export default function Wellness({ wellness, errors }) {
  const transition = useTransition()
  const [score, setScore] = React.useState(
    wellness?.rating ? wellness.rating : 0
  )

  const buttonText =
    transition.state === 'submitting'
      ? 'Saving'
      : transition.state === 'loading'
      ? 'Saved!'
      : 'Save'

  const buttonVariant =
    transition.state === 'submitting'
      ? 'warning'
      : transition.state === 'loading'
      ? 'success'
      : 'default'

  const handleClick = e => {
    setScore(e.target.id.split('-').slice(1).join(''))
  }

  // use the map index as key -- there shouldn't be a reorder
  const inputs = [...Array(10)].map((_, index) => {
    const filled = score > index ? 'bg-purple' : 'bg-transparent'
    return (
      <div
        className={`border-2 border-purple rounded-full w-6 h-6 mr-4 ${filled}`}
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
    <>
      <HeaderTwo>How do you feel?</HeaderTwo>
      <p className="mb-2">Rate how you are feeling out of 10.</p>
      <Form method="post">
        <input type="hidden" name="formType" value="wellness" />
        <input
          type="hidden"
          value={wellness?.id ? wellness.id : 'new'}
          name="id"
        />
        <input type="hidden" name="rating" value={score} />
        <div className="flex flex-direction">{inputs}</div>
        <Button
          type="submit"
          title={buttonText}
          variant={buttonVariant}
          width="w-28"
        />
      </Form>
    </>
  )
}
