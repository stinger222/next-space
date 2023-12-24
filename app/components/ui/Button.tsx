"use client"

import { ButtonHTMLAttributes, ReactNode } from "react"

type IProps = {
  variant?: "dark" | "light"
  className?: string
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ variant = "light", className, children, ...rest }: IProps) => {
  return <button
    className={`btn ${variant} ${className}`}
    {...rest}
  >
    {children}
  </button>
}

export default Button
