export const HeaderOne = ({ classes, children }: Headlines) => {
  return (
    <div className={`text-3xl font-title font-semibold mb-2 ${classes}`}>
      <h1>{children}</h1>
    </div>
  )
}

export const HeaderTwo = ({ classes, children }: Headlines) => {
  return (
    <div className={`text-xl font-title  mb-1 ${classes}`}>
      <h2>{children}</h2>
    </div>
  )
}
