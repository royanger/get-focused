import { HeaderTwo } from '../headlines'
import Radio from '../forms/radio'
import { findNotesEntries } from '~/queries/findNotes'
import { Form } from 'remix'
import Button from '../button'

interface Productivity {
  entries: {
    id: string
    userId: string
    dateId: string
    score: number
  }
}

export default function Productivity({ entries }: Productivity) {
  let items = [...Array(10)]

  let radioInputs

  if (entries?.id) {
    radioInputs = items.map((item, index) => {
      return (
        <div key={index}>
          <Radio
            value={index}
            name={index + 1}
            checked={index + 1 <= entries.score ? true : false}
          />
        </div>
      )
    })
  } else {
    radioInputs = items.map((item, index) => {
      return (
        <div key={index}>
          <Radio value={index} name="newproductivity" checked={false} />
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
