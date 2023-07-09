import { IPost } from "@/types/types"
import React from "react"

export const revalidate = 300
interface IProps {
  params: {
    postId: number
  }
}

export const generateSaticParams = async () => {
  const posts: IPost[] = await (await fetch("http://localhost:3000/api/posts")).json()
  return posts.map((post) => ({
    slug: post.id
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
