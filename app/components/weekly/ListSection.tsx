import TasksTitle from '../daily/TasksTitle'
import React from 'react'
import ReviewElement from './ReviewElement'
import DeleteIcon from '../icons/delete'
import { useFetcher } from 'remix'

export default function ListSection({
  items,
  title,
  info,
  errors,
  formType,
}: ReviewSections) {
  const fetcher = useFetcher()

  let itemsList
  if (items) {
    itemsList = items.map(item => {
      return (
        <div key={item.id} className="flex flex-row">
          <div className="flex-grow">
            <ReviewElement
              key={item.id}
              id={item.id}
              value={item.item}
              placeholder="Enter an area to improve"
              formType={formType}
            />
            {errors && errors.id === item.id ? (
              <div className="text-sm text-error mb-6 h-5">
                {errors ? errors.msg : ''}
              </div>
            ) : null}
          </div>
          <div>
            <fetcher.Form method="post">
              <div className="w-12">
                <input
                  type="hidden"
                  name="formType"
                  value={`delete${formType}`}
                />
                <input type="hidden" name="id" value={item.id} />
                <div className="flex flex-col items-center justify-start h-8">
                  <button
                    // aria-label={deleteFailed ? 'Retry Delete' : 'Delete'}
                    type="submit"
                    className="first:w-6 w-full text-purple"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </fetcher.Form>
          </div>
        </div>
      )
    })
  }

  return (
    <React.Fragment>
      <TasksTitle title={title} info={info} />
      {items && itemsList}
      <ReviewElement
        key={`new-${formType}`}
        id={`new-${formType}`}
        placeholder="Enter an area to improve"
        formType={formType}
        reset={true}
      />
      {errors && errors.id === `new-${formType}` ? (
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.msg : ''}
        </div>
      ) : null}
    </React.Fragment>
  )
}
