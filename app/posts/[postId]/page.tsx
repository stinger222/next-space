import { IPost } from "@/types/types"
import React from "react"

export const revalidate = 600
interface IProps {
  params: {
    postId: number
  }
}

// Called at build time, to help Next preload/cache possible [postId]
export const generateSaticParams = async () => {
  const posts: IPost[] = await (await fetch("http://localhost:3000/api/posts")).json()
  return posts.map((post) => ({
    postId: post.id
  }))
}

const Posts = async ({ params }: IProps) => {
  const posts: IPost[] = await (await fetch("http://localhost:3000/api/posts")).json()
  const post = posts.find((post) => +post.id === +params.postId)!
  console.log(post)

  if (!post)
    return <h1 className="text-red-600 text-center mt-10">Sorry, no post with such ID: {params.postId}.</h1>

  return (
    <div>
      <h1 className="font-normal mb-10 text-orange-400">
        A dedicated page for this specific post should be here
      </h1>
      <h1>{post.title}</h1>
      <p>{post.author}</p>
    </div>
  )
}

export default Posts
