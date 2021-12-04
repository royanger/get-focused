interface Props {
  title: string
  variant?: string
  children?: string
}

const Button = ({ title, variant, children }: Props) => {
  let bgColor
  let textColor
  if (
    variant === 'warning' ||
    variant === 'error' ||
    variant === 'success' ||
    variant === 'cancel'
  ) {
    bgColor = `bg-${variant}`
    textColor = 'text-black'
  } else {
    bgColor = 'bg-purple'
    textColor = 'text-yellow'
  }

  return (
    <>
      <button
        className={`${bgColor} ${textColor} m-1 px-3 pb-1 text-sm rounded shadow-lg  uppercase`}
      >
        {title}
      </button>
    </>
  )
}

export default Button
