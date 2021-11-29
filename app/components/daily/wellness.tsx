import Radio from '../forms/radio'
import { HeaderTwo } from '../headlines'

let items = [...Array(10)]

let radioInputs = items.map((item, index) => {
  return (
    <div key={index}>
      <Radio value={index} />
    </div>
  )
})

// TODO Don't need this unless I move queries into Components
interface Wellness {
  user?: string
  date?: string
}

export default function Wellness({ user, date }: Wellness) {
  //   let dateObj = new Date()
  //   let targetDate =
  //     date === 'today'
  //       ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  //       : 'asdfsadf'

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
