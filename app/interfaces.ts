import * as React from 'react'

export interface Entries {
  completed?: boolean
  id: string
}

export interface Exercise {
  entries: Entries
  errors: any
}

export interface Button {
  title: string
  variant?: string
  size?: string
  children?: string
  type: React.ButtonHTMLAttributes<HTMLButtonElement>
  onClick?: (values: string) => void
}

export interface Container {
  bgColor?: string
  children: JSX.Element
}

export interface Headers {
  classes?: string
  children: string
}

export interface Note {
  id: string
  dateId?: string
  note: string
}

export interface Notes {
  entries: {
    id: string
    userId: string
    dateId: string
    note: string
  }[]
  errors: any
}

export interface Tasks {
  entries: {
    id: string
    userId: string
    dateId: string
    statusId: string
    name: string
    actualTime: string
    goalTime: string
    timeTracker: number
    completed?: boolean
  }[]
  errors: any
}

export interface TasksByPriority {
  tasks: {
    id: string
    userId: string
    dateId: string
    statusId: string
    name: string
    actualTime: string
    goalTime: string
    timeTracker: number
    completed?: boolean
  }[]
  type: string
  errors: any
}

export interface WeeklyTasksByPriority {
  tasks: {
    id: string
    userId: string
    dateId: string
    statusId: string
    task: string
    completed: boolean
  }[]
  title: string
  info: string
  type: string
  errors: any
}

export interface TaskTitle {
  title: string
  info: string
}

export interface Wellness {
  entries: {
    id: string
    userId: string
    rating: number
    dateId: string
  }
  errors: any
}

export interface Checkbox {
  status?: boolean
  label: string
  handleClick: (values: any) => void
}

export interface Radio {
  value?: number | string
  checked?: boolean
  name: number | string
}

export interface Input {
  value: string
  name: string
  placeholder: string
  width: string
  formState?: React.ReactChild
  setFormState: React.Dispatch<React.SetStateAction<string>>
  completed?: string
}

export interface Cancel {
  setFormState: React.Dispatch<React.SetStateAction<string>>
}

export interface TaskElement {
  id: string
  completed?: boolean
  statusId?: string
  value?: string | undefined
  placeholder: string
  actualTime: string
  goalTime: string
  timeTracker: number
  type: string
}

export interface CompleteCheckbox {
  status?: boolean
  label: string
  id: string
}
export interface Items {
  id: string
  userId: string
  dateId: string
  item: string
}

export interface Wins {
  items: Items[]
  title: string
  info: string
  errors: any
  formType: string
}

export interface WeeklyNavOptions {
  year: number
  week: number
}
export interface WeeklyNav {
  navigation: {
    back: WeeklyNavOptions
    forward: WeeklyNavOptions
  }
  dates: string
  searchParams: URLSearchParams
  setSearchParams: React.Dispatch<React.SetStateAction<string>>
}
