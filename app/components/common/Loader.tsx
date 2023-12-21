import { twJoin, twMerge } from "tailwind-merge"

const Loader = ({ className }: { className?: string }) => {
  const defaultClasses = "w-24 h-24 mx-auto mt-52 border-8 rounded-full border-gray-800 border-t-transparent animate-spin"
  const classes = twMerge(defaultClasses, className, "border-t-transparent")

  return (
		<div className={classes}></div>
	)
}

export default Loader
