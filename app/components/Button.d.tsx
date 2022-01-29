type ButtonType = {
  title: string
  variant?: string
  size?: string
  children?: string
  type: React.ButtonHTMLAttributes<HTMLButtonElement>
  onClick?: (values: string) => void
}
