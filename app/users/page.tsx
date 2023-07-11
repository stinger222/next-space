import { prisma } from "@/lib/prisma"
import UserCard from "../components/common/UserCard"

const Users = async () => {
  const users = await prisma.user.findMany()

  return (
    <div className="flex flex-wrap justify-center gap-x-10 gap-y-5">
      {users.map((user) => (
        <UserCard
          key={user.id}
          {...user}
        />
      ))}
    </div>
  )
}

export default Users
