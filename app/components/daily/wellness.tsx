import Radio from '../forms/radio'
import { HeaderTwo } from '../headlines'

let items = [...Array(10)]

let RadioInputs = items.map((item, index) => {
  return (
    <div key={index}>
      <Radio value={index} />
    </div>
  )
})

console.log(RadioInputs)

export default function Wellness() {
  {
    /* <p>From DB: {data?.wellness && data.wellness[0]?.rating}</p> */
  }
  return (
    <>
      <HeaderTwo>How do you feel?</HeaderTwo>
      <p>Rate how you are feeling out of 10.</p>
      <div className="flex-shrink flex">
        <div className="grid grid-cols-10 mb-6">
          {RadioInputs}
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
