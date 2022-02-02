import TasksTitle from '../daily/TasksTitle'
import React from 'react'
import ReviewElement from './ReviewElement'

export default function ListSection({
  items,
  title,
  info,
  errors,
  formType,
}: ReviewSections) {
  let itemsList
  if (items) {
    itemsList = items.map(item => {
      return (
        <React.Fragment key={item.id}>
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
        </React.Fragment>
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
