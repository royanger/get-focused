import { HeaderTwo } from '../headlines'
import Radio from '../forms/radio'

let items = [...Array(10)]

let radioInputs = items.map((item, index) => {
  return (
    <div key={index}>
      <Radio value={index} />
    </div>
  )
})

export default function Productivity() {
  return (
    <>
      <HeaderTwo>Productivity Score?</HeaderTwo>
      <p>Rate how you productive you felt out of 10.</p>
      {/* <p>From DB: {data?.productivity && data.productivity[0]?.score}</p> */}
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