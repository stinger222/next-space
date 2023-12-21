import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const GET = async () => {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export const PUT = async (req: NextRequest) => {
  const userId = (await getServerSession(authOptions))?.user?.id
  
  if (!userId) return NextResponse.json({
    message: "No user ID provided in the requestbody"
  },{ status: 403 })
  
  const { name, age, image, bio } = await req.json()

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name, image, age: +age || null, bio}
    })

    return NextResponse.json({ name, image, age, bio }, {status: 200})
  } catch(err) {
    console.error("Can't update user\n", err)
    return NextResponse.json({ message: "Can't update user" }, {status: 404})
  }
}
