import { DefaultSession } from "next-auth"

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      id?: string | null
    }
    expires: ISODateString
  }
}