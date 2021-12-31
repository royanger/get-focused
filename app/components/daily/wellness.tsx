import * as React from 'react'
import { Form } from 'remix'
import Button from '../button'
import Radio from '../forms/radio'
import { HeaderTwo } from '../headlines'

interface Wellness {
  entries: {
    id: string
    userId: string
    rating: number
    dateId: string
  }
  errors: any
}

export default function Wellness({ entries, errors }: Wellness) {
  const [rating, setRating] = React.useState(
    entries?.rating ? entries.rating : 0
  )
  let items = [...Array(10)]
  let radioInputs

  function handleChange(e) {
    setRating(e.target.value)
  }

  if (entries?.id) {
    // use existing rating to build elements
    radioInputs = items.map((item, index) => {
      return (
        <div key={index + 1}>
          <Radio
            value={index + 1}
            name={index + 1}
            type="wellness"
            checked={index + 1 <= rating ? true : false}
            handleChange={handleChange}
          />
        </div>
      )
    })
  } else {
    // build empty elements for page
    radioInputs = items.map((item, index) => {
      return (
        <div key={index + 1}>
          <Radio
            value={index + 1}
            name="new"
            type="wellness"
            checked={index + 1 <= rating ? true : false}
            handleChange={handleChange}
          />
        </div>
      )
    })
  }

  return (
    <>
      <HeaderTwo>How do you feel?</HeaderTwo>
      <p className="mb-2">Rate how you are feeling out of 10.</p>
      <Form method="post" action="/daily/planner">
        <input type="hidden" value="wellness" name="formType" />
        <input
          type="hidden"
          value={entries?.id ? entries.id : 'new'}
          name="id"
        />
        <input type="hidden" value={rating} name="rating" />
        <div className="flex-shrink flex">
          <div className="grid grid-cols-12 mb-1">
            {radioInputs}
            <div className="row-start-1 row-end-3 col-start-11 col-end-13">
              <Button type="submit" title="Save" />
            </div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
          </div>
        </div>
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.error : ''}
        </div>
      </Form>
    </>
  )
}
