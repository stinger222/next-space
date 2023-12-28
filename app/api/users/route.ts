import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const GET = async () => {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export const PUT = async (req: NextRequest) => {
  const session = (await getServerSession(authOptions))
  const currentUserId = session?.user?.id
  
  if (!currentUserId) return NextResponse.json({
    message: "No user ID provided in the requestbody"
  },{ status: 403 })
  
  const { name, age, location, hometown, education, image, bio } = await req.json()

  try {
    await prisma.user.update({
      where: { id: currentUserId },
      data: { name, image, age: +age || null, location: location || "", hometown: hometown || "", education: education || "", bio }
    })

    return NextResponse.json({message: "success"}, {status: 200})
  } catch(err) {
    console.error("Can't update user\n", err)
    return NextResponse.json({ message: "Can't update user" }, {status: 500})
  }
}
