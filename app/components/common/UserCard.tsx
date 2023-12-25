import { IUser } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import placeholder from "@/public/avatar-placeholder.png"

interface IProps {
  user: IUser
}

const UserCard = async ({ user }: IProps) => {
  return (
    <div className="bg-gray-100 flex items-center justify-between flex-col p-3 rounded-xl">
      <Image
        width="180"
        height="180"
        className="rounded-md border border-gray-300"
        src={user.image || placeholder}
        alt="User's Avatar"
      />
      <Link
        href={`/users/${user.id}`}
        className="capitalize mt-3"
      >
        {user.name}
      </Link>
    </div>
  )
}

export default UserCard
