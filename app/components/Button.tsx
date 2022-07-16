import { SyncIcon, CheckIcon } from './icons'

const Button = ({ title, variant, size, type, width }: ButtonType) => {
  let baseStyles =
    'rounded shadow-lg uppercase w-28 flex flex-row items-center justify-center'

  let stylesMap: any = {
    default: 'bg-purple text-yellow',
    warning: 'bg-warning text-black',
    error: 'bg-error text-black',
    success: 'bg-success text-black',
    cancel: 'bg-cancel text-white',
    saving: 'bg-purple-300 text-yellow',
    saved: 'bg-yellow text-purple-300',
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
    variant === 'error' ||
    variant === 'saving' ||
    variant === `saved`
  ) {
    return (
      <button
        className={`${baseStyles} ${stylesMap[variant]} ${
          sizeMap[buttonSize]
        } ${width ? width : ''} `}
        type={type ? type : 'button'}
      >
        {variant === 'saving' ? (
          <SyncIcon className="w-4 mr-2 animate-spin" />
        ) : (
          ''
        )}
        {variant === 'saved' ? <CheckIcon className="w-4 mr-2" /> : ''}
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
         ${width ? width : ''}
         `}
        type={type}
      >
        {title}
      </button>
    </>
  )
}

export default Button
