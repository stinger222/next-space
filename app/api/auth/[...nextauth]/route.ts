import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from "next-auth/adapters"
import nextAuth, { NextAuthOptions } from "next-auth"
import GitHubProveder from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProveder({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    session: async ({user, session}) => {
      if (session?.user) {
        (session.user as any).id = user.id
      }

      if (session.user?.name?.trim?.() == "") {
        session.user.name = `@${user.id.substring(0, 6)}`
      }
      
      return session
    }
  }
}

const handler = nextAuth(authOptions)
export { handler as GET, handler as POST }
