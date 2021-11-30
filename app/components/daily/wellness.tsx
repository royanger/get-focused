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

export default function Wellness({
  entries: { id, userId, rating, dateId },
}: Wellness) {
  let items = [...Array(10)]

  let radioInputs = items.map((item, index) => {
    return (
      <div key={index}>
        <Radio value={index} checked={index + 1 <= rating ? true : false} />
      </div>
    )
  })

  {
    /* <p>From DB: {data?.wellness && data.wellness[0]?.rating}</p> */
  }
  return (
    <>
      <HeaderTwo>How do you feel?</HeaderTwo>
      <p>Rate how you are feeling out of 10.</p>
      <div className="flex-shrink flex">
        <div className="grid grid-cols-10 mb-6">
          {radioInputs}
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
    </>
  )
}
