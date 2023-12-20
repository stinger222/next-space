import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: NextResponse) => {
  const targetId = req.url.split("/users/")[1].split("/")[0]

  const user = await prisma.user.findUnique({
    where: { id: targetId }
  })

  return NextResponse.json(user)
}
