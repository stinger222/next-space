import AtIcon from "@/public/at-icon.svg"
import GoBackButton from "./GoBackButton"

interface IProps {
  header: string
  description: string
}

const ErrorPage = ({ header, description }: IProps) => {
  return (
    <main className="pt-12 flex flex-col items-center sm:pt-32">
      <h1 className="mb-16 text-[40px] sm:mb-20 text-gray-700">Error</h1>
      <AtIcon className="text-red-500 w-20 h-20" />
      <h2 className="mt-6 font-normal text-[29px] text-gray-900 text-center">{header}</h2>
      <p className="mt-6 text-gray-600 text-xl text-center">{description}</p>

      <GoBackButton />
    </main>
  )
}

export default ErrorPage
