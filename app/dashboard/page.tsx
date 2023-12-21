import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { IUser, prisma } from "@/lib/prisma"
import ProfileEditForm from "./ProfileEditForm"

const Dashboard = async () => {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/api/auth/signin")
  
  const userId = session.user?.id!
  const user = (await prisma.user.findUnique({ where: {id: userId} })) as IUser

	return (
		<div>
			<ProfileEditForm user={user}/>
		</div>
	)
}

export default Dashboard
