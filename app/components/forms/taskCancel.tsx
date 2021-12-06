import Button from '../button'

interface Cancel {
  setFormState: React.Dispatch<React.SetStateAction<string>>
}

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
