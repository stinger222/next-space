import { getServerSession } from "next-auth"
import { IPost } from "../../../types/types"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export const GET = async () => {
  const posts = await prisma.post.findMany()
  return NextResponse.json(posts)
}

export const POST = async (req: NextRequest) => {
  const authorId = (await getServerSession(authOptions))?.user?.id
  if (!authorId) return NextResponse.json("Not Authorized", { status: 401 })

  const postMessage = (await req.json())?.postMessage?.trim()
  if (!postMessage) return NextResponse.json("Invalid post message", { status: 403 })

  console.log("\n\nTrying to create new post: ")
  console.log("authorId: ", authorId)
  console.log("postMessage: ", postMessage, "\n\n")

  try {
    await prisma.post.create({
      data: {
        postMessage,
        authorId
      }
    })
    return NextResponse.json("Post created successfully", { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json("Can't create post due to some internal server error", { status: 500 })
  }
}
