import TasksTitle from '../daily/TasksTitle'
import React from 'react'
import ReviewElement from './ReviewElement'
import DeleteIcon from '../icons/delete'
import { useFetcher, useFetchers, useTransition } from 'remix'

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
        <div key={item.id} className="flex flex-row sdf">
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
