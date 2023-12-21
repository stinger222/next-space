"use client"

import PostCard from "../../common/PostCard"
import { PostModelNoAuthor, PostModelWithAuthor } from "@/types/types"

interface IProps {
  authorName: string,
  posts: PostModelNoAuthor[],
  loading: boolean,
  currentUserIsOwner: boolean,
  onPostDeletion: (updatedPosts: PostModelWithAuthor[]) => void
}

// TODO: User Axios over fetch and handle errors
const PostsList = ({ posts, loading, authorName, currentUserIsOwner, onPostDeletion }: IProps) => {
  if (loading) return <h1>Loading...</h1>
  if (!posts?.length) return <h1>No Posts here :(</h1>

  const handlePostDeletion = (postId: string) => {
    console.log("Trying to delete post...")

    fetch("/api/posts", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ postId })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Post successfully deleted!")
        onPostDeletion(data.posts)
      })
  }

  return (
    <div className="flex flex-col-reverse">
      {posts.map((post) => (
        <PostCard
          editable={currentUserIsOwner}
          authorName={authorName} // TODO: make user.name required in the prisma schema
          postMessage={post.postMessage}
          onDelete={() => handlePostDeletion(post.postId)}
          key={post.postId}
        />
      ))}
    </div>
  )
}

export default PostsList
