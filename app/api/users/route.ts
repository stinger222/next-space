import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const users = await prisma.user.findMany()

  return NextResponse.json(users)
}

export const PUT = async (req: NextRequest) => {
  const { name, age, image, bio, id } = await req.json()
  
  if (!id) return NextResponse.json({
    message: "No user ID provided in the requestbody"
  },{ status: 403 })

  try {
    await prisma.user.update({
      where: { id: id },
      data: { name, image, age: +age || null, bio}
    })

    return NextResponse.json({
      name, image, age, bio, message: "User profile data was successfully updated"
    }, {status: 200})
  } catch(err) {
    console.error("Can't update user\n", err)
    return NextResponse.json({
      message: "Can't update user"
    }, {status: 404})
  }
}
