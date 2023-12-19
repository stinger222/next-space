import { ReactNode } from "react"

interface IProps {
  variant?: "dark" | "light"
  className?: string
  children: ReactNode
}

const Button = ({ variant = "light", className, children }: IProps) => {
  return <button className={`btn ${variant} ${className}`}>{children}</button>
}

export default Button
