import TasksTitle from '../daily/tasksTitle'
import React from 'react'
import ReviewElement from './reviewElement'

interface Wins {
  items: {
    id: string
    userId: string
    dateId: string
    win: string
  }[]
  title: string
  info: string
  errors: any
  formType: string
}

export default function ListSection({
  items,
  title,
  info,
  errors,
  formType,
}: Wins) {
  let itemsList
  if (items) {
    itemsList = items.map(item => {
      return (
        <React.Fragment key={item.id}>
          <ReviewElement
            key={item.id}
            id={item.id}
            win={item.win}
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
        key={`new-win`}
        id="new-win"
        win="Create a new task"
        formType={formType}
      />
      {errors && errors.id === `new-$win` ? (
        <div className="text-sm text-error mb-6 h-5">
          {errors ? errors.msg : ''}
        </div>
      ) : null}
    </React.Fragment>
  )
}
