"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import Loader from "../common/Loader"
import placeholder from "@/public/avatar-placeholder.png"

export const SignInOutButton = () => {
  const { data, status } = useSession()

  if (status === "loading") return <Loader className="h-8 w-8 m-0 border-white border-4"/>

  if (status === "authenticated") {
    return <>
      <li className="order-1 xs:order-none shrink-0">
        <button
          className="px-2 outline outline-1 outline-white rounded-md"
          title="Sign Out?"
          onClick={() => signOut()}
        >
          Sign&nbsp;Out
        </button>
      </li>

      <li className="-order-2 xs:order-none shrink-0">
        <Link href="/api/users/me">
          <Image
            height={35}
            width={35}
            src={data.user?.image || placeholder }
            alt="User Avatar"
            className="rounded-full cursor-pointer xs:translate-y-[-15%]"
          />
        </Link>
      </li>
    </>
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

// export const SignInOutButton = () => {
//   const { data, status } = useSession()

//   if (status === "loading") return <Loader className="h-8 w-8 m-0 border-white border-4"/>

//   if (status === "authenticated") {
//     return (
//       <Image
//         height={35}
//         width={35}
//         src={data.user?.image || placeholder }
//         alt="User Avatar"
//         title="Sign Out?"
//         className="rounded-full cursor-pointer xs:translate-y-[-15%]"
//         onClick={() => signOut()}
//       />
//     )
//   }

//   return (
//     <button
//       onClick={() => signIn()}
//       className="bg-white text-black px-2 rounded-md"
//     >
//       Sign In
//     </button>
//   )
// }
