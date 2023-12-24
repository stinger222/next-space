import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export const POST = async (req: NextRequest) => {
  const currentUserId = (await getServerSession(authOptions))?.user?.id
  if (!currentUserId) return NextResponse.json("Not Authorized", { status: 401 })
  
  const { targetUserId } = await req.json()

  const record = await prisma.follow.create({
    data: {
      followerId: currentUserId,
      followingId: targetUserId
    }
  })

  return NextResponse.json(record)
}

export const DELETE = async (req: NextRequest) => {
  const currentUserId = (await getServerSession(authOptions))?.user?.id
  if (!currentUserId) return NextResponse.json("Not Authorized", { status: 401 })
  
  const { targetUserId } = await req.json()
  
  const record = await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId
      }
    }
  })

  return NextResponse.json(record)
}