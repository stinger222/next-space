"use client"

import { useEffect } from "react"

interface IProps {
  error: Error,
  reset: () => void
}

const Error = ({ error, reset }: IProps) => {

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <h1>
      Something went wrong :(<br /><br />
      <span
        className="underline text-blue-600 font-semibold select-none"
        onClick={reset}
      >
        Try again
      </span>, or come back a little later
    </h1>
  )
}

export default Error