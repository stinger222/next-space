import nextAuth, { NextAuthOptions } from "next-auth"
import GitHubProveder from "next-auth/providers/github"

const authOptions: NextAuthOptions = {
  providers: [
    GitHubProveder({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET as string
}

const handler = nextAuth(authOptions)
export { handler as GET, handler as POST }
