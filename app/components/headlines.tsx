interface Props {
  classes?: string
  children: string
}

export const HeaderOne = ({ classes, children }: Props) => {
  return (
    <div className={`text-3xl font-title font-semibold mb-4 ${classes}`}>
      <h1>{children}</h1>
    </div>
  )
}

export const HeaderTwo = ({ classes, children }: Props) => {
  return (
    <div className={`text-2xl font-title  mb-3 ${classes}`}>
      <h2>{children}</h2>
    </div>
  )
}
