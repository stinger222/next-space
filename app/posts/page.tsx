import { IPost } from "@/types/types"
import Link from "next/link"

const AllPosts = async () => {
  const posts: IPost[] = await (await fetch("http://localhost:3000/api/posts")).json()

  return (
    <pre>
      {JSON.stringify(posts, null, 2)}
    </pre>
  )
}

export default AllPosts
