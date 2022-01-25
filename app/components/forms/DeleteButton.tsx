import Delete from '../icons/delete'

interface DeleteButton {
  id: string
}

export default function DeleteButton({ id }: DeleteButton) {
  return (
    <>
      <form method="post" className="border-2 border-x-red m-2">
        <div>
          <input type="hidden" name="formType" value="deleteTask" />
          <input type="hidden" name="id" value={id} />
          <div>
            <button type="submit" className="first:w-6 w-full">
              <Delete />
            </button>
          </div>
          <div>Delete</div>
        </div>
      </form>
    </>
  )
}
