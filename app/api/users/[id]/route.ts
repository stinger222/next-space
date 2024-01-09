import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const targetId = req.url.split("/users/")[1].split("/")[0] // TODO: wtf?

  const user = await prisma.user.findUnique({
    where: { id: targetId },
    include: { posts: true }
  })

  return NextResponse.json(user)
}
