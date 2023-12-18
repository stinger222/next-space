import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../../auth/[...nextauth]/route"

export const GET = async () => {
  const currentUserId = (await getServerSession(authOptions))?.user?.id
  console.log("currentUserIdcurrentUserId: ", currentUserId)
  
  if (!currentUserId) return redirect("/api/auth/signin")
  return redirect(`/users/${currentUserId}`)
}