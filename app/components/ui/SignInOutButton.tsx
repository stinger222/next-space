"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Loader from "../common/Loader"

export const SignInOutButton = () => {
  const { data, status } = useSession()

  if (status === "loading") return <Loader className="h-8 w-8 m-0 border-white border-4"/>

  if (status === "authenticated") {
    return (
      <Image
        height={35}
        width={35}
        src={data.user?.image || require("../../../public/logo.svg")} // TODO: Add default image
        alt="User Avatar"
        title="Sign Out?"
        className="rounded-full cursor-pointer xs:translate-y-[-15%]"
        onClick={() => signOut()}
      />
    )
  }

  return (
    <button
      onClick={() => signIn()}
      className="bg-white text-black px-2 rounded-md"
    >
      Sign In
    </button>
  )
}
