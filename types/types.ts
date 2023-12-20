import { Prisma } from "@prisma/client"

export interface IPost {
  date: string
  author: string
  title: string
  id: number
}

export type PostModel = Prisma.PostGetPayload<{ include: { author: false } }>