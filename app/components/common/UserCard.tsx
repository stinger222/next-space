import { IUser } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import placeholder from "@/public/avatar-placeholder.png"

const UserCard = async ({ id, name, image }: IUser) => {
  return (
    <div className="bg-gray-100 flex items-center justify-between flex-col p-3 rounded-xl">
      <Image
        width="180"
        height="180"
        className="rounded-md border border-gray-300"
        src={image || placeholder}
        alt="User's Avatar"
      />
      <Link
        href={`/users/${id}`}
        className="capitalize mt-3"
      >
        {name}
      </Link>
    </div>
  )
}

export default UserCard
