import { Prisma } from "@prisma/client"

export interface IPost {
  date: string
  author: string
  title: string
  id: number
}

// TODO: DELETE!!!
export type PostModelWithAuthor = Prisma.PostGetPayload<{ include: { author: true } }>
// TODO: DELETE!!!
export type PostModelNoAuthor = Prisma.PostGetPayload<{ include: { author: false } }>

// TODO: DELETE!!!
export type UserModelWithPosts = Prisma.UserGetPayload<{ include: { posts: true } }>
// TODO: DELETE!!!
export type UserModelNoPosts = Prisma.UserGetPayload<{ include: { posts: false } }>

export interface IPostAuthor {
  id: string,
  name?: string | null,
  image?: string | null
}
