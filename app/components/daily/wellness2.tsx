import * as React from 'react'
import { Form } from 'remix'
import { HeaderTwo } from '../headlines'

// TODO so far everything is assuming that there is a score in the DB
// need to support adding a new score and not just loading an existing
export default function Wellness2({ wellness, errors }) {
  console.log(wellness)

  const [score, setScore] = React.useState(wellness?.rating)

  const handleClick = e => {
    console.log('clicked', e.target.id.split('-').slice(1).join(''))
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
        key={index}
      >
        <span className="sr-only">{index + 1}</span>
      </div>
    )
  })

  return (
    <>
      <HeaderTwo>How do you feel? (2)</HeaderTwo>
      <p className="mb-2">Rate how you are feeling out of 10.</p>
      <Form method="post">
        <input type="hidden" value="wellness" name="formType" />
        <input
          type="hidden"
          value={wellness?.id ? wellness.id : 'new'}
          name="id"
        />
        <input type="hidden" value="rating" name={243} />
        <div className="flex flex-direction">{inputs}</div>
      </Form>
    </>
  )
}
