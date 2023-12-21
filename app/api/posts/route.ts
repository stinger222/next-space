import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export const GET = async () => {
  const posts = await prisma.post.findMany({
    include: { author: true }
  })

  return NextResponse.json(posts)
}

export const POST = async (req: NextRequest) => {
  const currentUserId = (await getServerSession(authOptions))?.user?.id
  if (!currentUserId) return NextResponse.json("Not Authorized", { status: 401 })

  const postMessage = (await req.json())?.postMessage?.trim()
  if (!postMessage) return NextResponse.json("Invalid post message", { status: 403 })

  try {
    await prisma.post.create({
      data: {
        postMessage,
        authorId: currentUserId
      }
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json("Can't create post due to some internal server error", { status: 500 })
  }

  const posts = await prisma.post.findMany({ where: { authorId: currentUserId } })
  return NextResponse.json({ posts }, { status: 200 })
}

export const DELETE = async (req: NextRequest) => {
  const currentUserId = (await getServerSession(authOptions))?.user?.id
  if (!currentUserId) return NextResponse.json("Not Authorized", { status: 401 })

  const toDeletePostId = (await req.json())?.postId

  if (!toDeletePostId) return NextResponse.json("Invalid post ID", { status: 403 })

  const deleted = await prisma.post.deleteMany({
    where: {
      authorId: currentUserId,
      postId: toDeletePostId
    }
  })

  if (deleted?.count === 0) {
    return NextResponse.json("Couldn't delete post due to some internal server error", { status: 500 })
  }

  const posts = await prisma.post.findMany({
    where:  {authorId: currentUserId }
  })
  
  return NextResponse.json({ posts }, { status: 200 })
}
