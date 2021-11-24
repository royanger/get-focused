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
    console.log('correct type passed')
  } else {
    bgColor = 'bg-purple'
    textColor = 'text-yellow'
    console.log('incorrect or no type passed')
  }

  return (
    <>
      <button
        className={`${bgColor} ${textColor} m-2  px-6 py-2 text-lg rounded shadow-lg font-semibold`}
      >
        {title}
      </button>
    </>
  )
}

export default Button
