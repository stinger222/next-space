import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Button from "./components/ui/Button"
import Link from "next/link"

 const Home = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-16 text-center text-5xl font-bold sm:mt-32 sm:hidden">
        Welcome to
        <br />
        <span className="px-1 whitespace-nowrap italic bg-gradient-to-br from-[#2f16ff] to-[#9000ff] bg-clip-text text-transparent">
          NextSpace
        </span>
      </h1>

      <h1 className="hidden mt-16 text-center text-5xl font-bold sm:mt-32 sm:block">
        Welcome to
        <span className="px-1 whitespace-nowrap italic bg-gradient-to-br from-[#2f16ff] to-[#9000ff] bg-clip-text text-transparent">
          &nbsp;NextSpace
        </span>
      </h1>

      <p className="mt-1 text-center text-[19px] text-gray-500 font-medium">
        Completely useless demo application intended to practice <br /> some Next.js Framework&apos; basics
      </p>
      <span className="mt-5">
        <Link href="/about">
          <Button
            className="m-2"
            variant="dark"
          >
            About
          </Button>
        </Link>

        <Link href={`/api/users/me`}>
          <Button className="m-2">My Profile</Button>
        </Link>
      </span>
    </div>
  )
}

export default Home