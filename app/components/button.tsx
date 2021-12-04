interface Props {
  title: string
  variant?: string
  size?: string
  children?: string
}

const Button = ({ title, variant, size, children }: Props) => {
  let baseStyles = 'rounded shadow-lg uppercase'

  let stylesMap: any = {
    default: 'bg-purple text-yellow',
    warning: 'bg-warning text-green',
    error: 'bg-red text-black',
    success: 'bg-green text-black',
    cancel: 'bg-cancel text-black',
  }

  //   let buttonSize = !size ? 'default' : size
  let buttonSize
  if (!size) {
    buttonSize = 'default'
  } else {
    buttonSize = size
  }

  let sizeMap: any = {
    default: 'm-2 px-3 pb-2',
    sm: 'text-sm px-2 pb-2 m-1',
    lg: 'text-lg px-4 pb-3 m-3',
  }

  console.log('BUTTONSIZE', buttonSize)
  if (variant === 'warning') {
    return (
      <button
        className={`${baseStyles} ${stylesMap[variant]} ${sizeMap[buttonSize]}`}
      >
        {title}
      </button>
    )
  }

  return (
    <>
      <button
        className={`
        ${baseStyles}
         ${stylesMap['default']}
         ${sizeMap[buttonSize]}
         `}
      >
        {title} XX
      </button>
    </>
  )
}

export default Button
