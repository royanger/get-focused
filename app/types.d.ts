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
  handleClick?: (values: any) => void | undefined
}

type Radio = {
  value?: string
  checked?: boolean
  name: string | undefined
}

type Input = {
  value?: string | FormDataEntryValue | null
  name: string
  placeholder: string
  width: string
  editing?: boolean
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
  completed?: string
}

type Cancel = {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

type TaskElement = {
  inputRef?: React.MutableRefObject<undefined>
  id: string
  completed?: boolean
  statusId?: string
  value?: FormDataEntryValue | string | null
  placeholder: string
  goalTime: FormDataEntryValue | string | null | undefined
  timeTracker: number
  type: string
}

type WeeklyTaskElement = {
  id: string
  placeholder: string
  completed?: boolean
  value?: string | FormDataEntryValue | null
  type: string
  saving?: true
  visibility: string
}

type CompleteCheckbox = {
  status?: boolean
  setCompletedStatus: React.Dispatch<React.SetStateAction<boolean>>
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
  errors: ErrorObject
  formType: string
}

type Reviews = {
  id: string
  value?: string | FormDataEntryValue | null
  placeholder: string
  formType: string
  errors?: ErrorObject
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
  week: number
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
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

type ErrorObject = {
  formType: string
  message: string
  id?: FormDataEntryValue | null
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
