import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Button from "./components/ui/Button"
import Link from "next/link"

 const Home = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-16 text-center text-5xl font-bold sm:mt-32">
        Welcome to 
        <span className="px-1 whitespace-nowrap italic bg-gradient-to-br from-[#2f16ff] to-[#9000ff] bg-clip-text text-transparent">
          NextSpace
        </span>
      </h1>
      <p className="mt-3 text-center text-[19px] text-gray-500 font-medium">
        Completely useless demo application intended to practice <br/> some Next.js Framework&apos; basics
      </p>
      <span className="mt-5">
        <a href="https://github.com" target="_blank">
          <Button variant="dark">About</Button>
        </a>

        <Link href={`/users/${session?.user?.id}`}>
          <Button>My Profile</Button>
        </Link>
      </span>
    </div>
  )
}

export default Home