"use client"

import { api } from "@/lib/api"
import PostCard from "../../common/PostCard"
import { PostModelNoAuthor, PostModelWithAuthor } from "@/types/types"
import { AxiosResponse } from "axios"

interface IProps {
  authorName: string,
  posts: PostModelNoAuthor[],
  loading: boolean,
  currentUserIsOwner: boolean,
  onPostDeletion: (updatedPosts: PostModelWithAuthor[]) => void
}

const PostsList = ({ posts, loading, authorName, currentUserIsOwner, onPostDeletion }: IProps) => {
  if (loading) return <h1>Loading...</h1>
  if (!posts?.length) return <h1>No Posts here :(</h1>

  const handlePostDeletion = (postId: string) => {
    console.log("\nTrying to delete post...")
    
    api
      .delete("api/posts", { data: { postId } })
      .then((response: AxiosResponse<{posts: PostModelWithAuthor[]}>) => {
        onPostDeletion(response.data.posts)
        console.log("Post successfully deleted!")
      })
      .catch((err) => {
        console.error("Can't delete post:\n", err)
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
