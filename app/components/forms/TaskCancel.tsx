import Button from '../Button'

// TODO will need to clear form/reset to default values

export default function TaskCancel({ setEditing }: Cancel) {
  return (
    <>
      <Button
        title="Cancel"
        variant="cancel"
        size="sm"
        type="reset"
        onClick={() => setEditing(false)}
      />
    </>
  )
}