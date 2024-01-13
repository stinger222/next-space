import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const GET = async () => {
  const currentUserId = (await getServerSession(authOptions))?.user?.id
  
  if (!currentUserId) return redirect("/api/auth/signin")
  return redirect(`/users/${currentUserId}`)
}

export const DELETE = async () => {
  const currentUserId = (await getServerSession(authOptions))?.user?.id

  if (!currentUserId) return NextResponse.json("Not Authorized", { status: 401 })

  const record = await prisma.user.delete({
    where: {
      id: currentUserId
    }
  })

  return NextResponse.json(record, { status: 200 })
}