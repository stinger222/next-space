import { Prisma } from "@prisma/client"

export interface IPost {
  date: string
  author: string
  title: string
  id: number
}

export type PostModelWithAuthor = Prisma.PostGetPayload<{ include: { author: true } }>
export type PostModelNoAuthor = Prisma.PostGetPayload<{ include: { author: false } }>

export type UserModelWithPosts = Prisma.UserGetPayload<{ include: { posts: true } }>
export type UserModelNoPosts = Prisma.UserGetPayload<{ include: { posts: false } }>
