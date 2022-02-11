type DailyNav = {
  week: string[]
}

type Productivity = {
  entries: {
    id: string
    userId: string
    dateId: string
    score: number
  }
  errors: any
}

declare enum ButtonTypes {
  'button',
  'submit',
  'reset',
  undefined,
}

type ButtonType = {
  title: string
  variant?: string
  size?: string
  children?: string
  width?: string
  type?: any
  onClick?: (values: string) => void
}

type Entries = {
  completed?: boolean
  id: string
}

type Exercise = {
  entries: Entries
  errors: any
}

type Container = {
  bgColor?: string
  children: JSX.Element
}

type Headlines = {
  classes?: string
  children: string
}

type Note = {
  id: string
  dateId?: string
  note: string
}

type Notes = {
  entries: {
    id: string
    userId: string
    dateId: string
    note: string
  }[]
  errors: any
}

type Tasks = {
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

type TasksByPriority = {
  tasks:
    | {
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
    | null
  type: string
  errors: any
}

type WeeklyTasksByPriority = {
  tasks: {
    id: string
    userId: string
    dateId: string
    statusId: string
    task: string
    completed: boolean
  }[]
  type: string
  errors: any
}

type TaskTitle = {
  title: string
  info: string
}

type Wellness = {
  wellness: {
    id: string
    userId: string
    rating: number
    dateId: string
  }
  errors: any
}

type Checkbox = {
  status?: boolean
  label: string
  handleClick: (values: any) => void | undefined
}

type Radio = {
  value?: number | string
  checked?: boolean
  name: string | undefined
}

type Input = {
  value?: string | FormDataEntryValue | null
  name: string
  placeholder: string
  width: string
  formState?: React.ReactChild
  setFormState: React.Dispatch<React.SetStateAction<string>>
  completed?: string
}

type Cancel = {
  setFormState: React.Dispatch<React.SetStateAction<string>>
}

type TaskElement = {
  inputRef?: React.MutableRefObject<undefined>
  id: string
  completed?: boolean
  statusId?: string
  value?: FormDataEntryValue | string | null
  placeholder: string
  actualTime: string
  goalTime: FormDataEntryValue | string | null
  timeTracker: number
  type: string
}

type WeeklyTaskElement = {
  id: string
  placeholder: string
  completed?: boolean
  value?: string | FormDataEntryValue | null
  type: string
}

type CompleteCheckbox = {
  status?: boolean
  label: string
  id: string
}
type Items = {
  id: string
  userId: string
  dateId: string
  item: string
}

type ReviewSections = {
  items: Items[]
  title: string
  info: string
  errors: any
  formType: string
}

type Reviews = {
  id: string
  value?: string | FormDataEntryValue | null
  placeholder: string
  formType: string
  reset?: boolean
  errors?: {
    formType: string
    id: string
    msg: string
  }
}

type WeeklyNavOptions = {
  year: number
  week: number
}
type WeeklyNav = {
  navigation: {
    back: WeeklyNavOptions
    forward: WeeklyNavOptions
  }
  dates: string
}

type Tab = {
  title: string
}

type DeleteButton = {
  id: string
}

type TimeTracker = {
  tracker: number
  setTracker: React.Dispatch<React.SetStateAction<number>>
}

type QueryInfo = {
  (
    id: FormDataEntryValue | null,
    user: {
      id: string
    }
  ): Tasks | { error: boolean } | null
}
// type DoughtnutDatasets = {
//   label: string | number
//   borderWidth: number
//   backgroundColor: string[]
//   data: number[]
// }

// type DoughnutData = {
//   data: {
//     labels: number[]
//     datasets: DoughtnutDatasets
//   }
// }
