import { IPost } from "@/types/types"
import Link from "next/link"

const AllPosts = async () => {
  const posts: IPost[] = await (await fetch("http://localhost:3000/api/posts")).json()

  return (
    <div>
      {posts.map((post: IPost) => (
        <div
          key={post.id}
          className="mt-4"
        >
          <Link href={`/posts/${post.id}`}>
            <h1 className="capitalize">{post.title}</h1>
          </Link>
          <p>Author: {post.author}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default AllPosts
