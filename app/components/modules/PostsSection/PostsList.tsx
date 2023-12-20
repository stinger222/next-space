"use client"

import { PostModel } from "@/types/types"
import PostCard from "../../common/PostCard"



interface IProps {
  posts: PostModel[]
  ownerName: string,
  loading: boolean,
  currentUserIsOwner: boolean,
  onPostDeletion: (updatedPosts: PostModel[]) => void
}

// TODO: User Axios over fetch and handle errors
const PostsList = ({ posts, ownerName, loading, currentUserIsOwner, onPostDeletion }: IProps) => {
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
        console.log("Post successfully deleted!:", data.posts)
        onPostDeletion(data.posts)
      })
  }

  return (
    <div className="flex flex-col-reverse">
      {posts.map((post) => (
        <PostCard
          editable={currentUserIsOwner}
          ownerName={ownerName}
          post={post}
          onDelete={handlePostDeletion}
          key={post.postId}
        />
      ))}
    </div>
  )
}

export default PostsList
