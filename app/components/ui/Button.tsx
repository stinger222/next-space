import { ReactNode } from "react"

interface IProps {
  variant?: "dark" | "light",
  children: ReactNode
}

const Button = ({ variant = "light", children }: IProps) => {
	return (
		<button className={`btn ${variant}`}>
			{children}
		</button>
	)
}

export default Button
