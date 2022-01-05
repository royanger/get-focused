import Button from '../button'
import { Cancel } from '~/interfaces'

// TODO will need to clear form/reset to default values

export default function TaskCancel({ setFormState }: Cancel) {
  return (
    <>
      <Button
        title="Cancel"
        variant="cancel"
        size="sm"
        onClick={() => setFormState('default')}
      />
    </>
  )
}
