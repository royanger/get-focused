import * as React from 'react'
import TasksTitle from '../daily/TasksTitle'
import ReviewElement from './ReviewElement'
import { useTransition } from '@remix-run/react'

export default function ListSection({
  items,
  title,
  info,
  errors,
  formType,
}: ReviewSections) {
  const transition = useTransition()

  const isAdding =
    transition.submission &&
    transition.submission?.formData.get('formType') === formType &&
    transition.submission?.formData.get('id') === `new-${formType}`

  let itemsList
  if (items) {
    itemsList = items.map(item => {
      return (
        <ReviewElement
          key={item.id}
          id={item.id}
          value={item.item}
          placeholder="Enter an area to improve"
          formType={formType}
          errors={errors}
        />
      )
    })
  }

  return (
    <React.Fragment>
      <TasksTitle title={title} info={info} />
      {items && itemsList}
      {isAdding && (
        <ReviewElement
          key={`adding-${formType}`}
          id={`adding-${formType}`}
          placeholder="Enter an area to improve"
          value={transition.submission.formData.get('item')}
          formType={formType}
          errors={errors}
        />
      )}
      <ReviewElement
        key={`new-${formType}`}
        id={`new-${formType}`}
        placeholder="Enter an area to improve"
        formType={formType}
        errors={errors}
      />
    </React.Fragment>
  )
}
