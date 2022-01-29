import * as React from 'react'
import { HeaderTwo } from '../headlines'
import Radio from '../forms/radio'
import { Form } from 'remix'
import Button from '../Button'

interface Productivity {
  entries: {
    id: string
    userId: string
    dateId: string
    score: number
  }
  errors: any
}

export default function Productivity({ entries, errors }: Productivity) {
  const [rating, setRating] = React.useState(entries?.score ? entries.score : 0)
  const items = [...Array(10)]
  let radioInputs

  function handleChange(e) {
    setRating(e.target.value)
  }

  if (entries?.id) {
    // use existing score to build an array
    radioInputs = items.map((item, index) => {
      return (
        <div key={index + 1}>
          <Radio
            value={index + 1}
            name={index + 1}
            type="productivity"
            checked={index + 1 <= rating ? true : false}
            handleChange={handleChange}
          />
        </div>
      )
    })
  } else {
    // build and empty array for a new entry
    radioInputs = items.map((item, index) => {
      return (
        <div key={index}>
          <Radio
            value={index + 1}
            name="new"
            type="productivity"
            checked={false}
            handleChange={handleChange}
          />
        </div>
      )
    })
  }

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
        <input type="hidden" value={rating} name="rating" />
        <div className="flex-shrink flex">
          <div className="grid grid-cols-12 mb-6">
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
          {errors ? errors.msg : ''}
        </div>
      </Form>
    </>
  )
}
