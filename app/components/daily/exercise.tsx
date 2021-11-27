import Checkbox from '../forms/checkbox'
import { HeaderTwo } from '../headlines'

export default function Exercise() {
  {
    /* <p>From DB: {data?.exercise[0]?.completed ? 'true' : 'false'}</p> */
  }

  return (
    <>
      <HeaderTwo>Did you exercise today?</HeaderTwo>
      <div>
        <Checkbox checked={true} label="Yes" />
      </div>
      <div>
        <Checkbox checked={false} label="No" />
      </div>
    </>
  )
}
