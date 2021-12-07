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
}

export default function Wellness({ entries }: Wellness) {
  let items = [...Array(10)]
  let radioInputs

  if (entries?.id) {
    // use existing rating to build elements
    radioInputs = items.map((item, index) => {
      return (
        <div key={index}>
          <Radio
            value={index}
            name={index}
            checked={index + 1 <= entries.rating ? true : false}
          />
        </div>
      )
    })
  } else {
    // build empty elements for page
    radioInputs = items.map((item, index) => {
      return (
        <div key={index}>
          <Radio value={index} name="newwellness" checked={false} />
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
      </Form>
    </>
  )
}
