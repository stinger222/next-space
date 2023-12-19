"use client"

import { useRouter } from "next/navigation"
import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type IProps = {
  className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">

const defaultClasses = "mt-14 p-4 w-full max-w-md bg-sky-500 text-white text-xl font-semibold rounded-md"

const GoBackButton = ({ className, ...rest }: IProps) => {
  const router = useRouter()
  const classes = twMerge(defaultClasses, className)

  return (
    <button
      onClick={() => router.back()}
      className={`${classes}`}
      {...rest}
    >
      Go Back
    </button>
  )
}

export default GoBackButton
