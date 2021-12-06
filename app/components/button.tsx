interface Props {
  title: string
  variant?: string
  size?: string
  children?: string
  onClick: (values: string) => void
}

const Button = ({ title, variant, size, children, onClick }: Props) => {
  let baseStyles = 'rounded shadow-lg uppercase'

  let stylesMap: any = {
    default: 'bg-purple text-yellow',
    warning: 'bg-warning text-black',
    error: 'bg-error text-black',
    success: 'bg-success text-black',
    cancel: 'bg-cancel text-white',
  }

  let buttonSize
  if (!size) {
    buttonSize = 'default'
  } else {
    buttonSize = size
  }

  let sizeMap: any = {
    default: 'm-2 px-4 pb-2 pt-[.4rem]',
    sm: 'text-sm px-3 pb-2 m-1 pt-[.4rem] ',
    lg: 'text-lg px-5 pb-3 m-3 pt-2',
  }

  if (
    variant === 'warning' ||
    variant === 'cancel' ||
    variant === 'success' ||
    variant === 'error'
  ) {
    return (
      <button
        className={`${baseStyles} ${stylesMap[variant]} ${sizeMap[buttonSize]}`}
        onClick={() => onClick('default')}
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
        {title}
      </button>
    </>
  )
}

export default Button
