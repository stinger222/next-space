"use client"

import { api } from "@/lib/api"
import PostCard from "../../common/PostCard"
import { IPostAuthor, PostModelNoAuthor, PostModelWithAuthor } from "@/types/types"
import { AxiosResponse } from "axios"
import Loader from "../../common/Loader"
import { Prisma } from "@prisma/client"

interface IProps {
  posts: PostModelNoAuthor[],
  loading: boolean,
  currentUserIsOwner: boolean,
  author: Prisma.UserGetPayload<{ include: { posts: true } }>
  onPostDeletion: (updatedPosts: PostModelWithAuthor[]) => void
}

const PostsList = ({ posts, loading, author, currentUserIsOwner, onPostDeletion }: IProps) => {
  if (loading) return <Loader className="my-20"/>
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
      {posts.map((post) => {
        const _author: IPostAuthor = {
          name: author.name, // TODO: make user.name required in the prisma schema and handle "" in the auth callback
          id: author.id,
          image: author.image
        }
        
        return (
          <PostCard
            author={_author}
            editable={currentUserIsOwner}
            postMessage={post.postMessage}
            onDelete={() => handlePostDeletion(post.postId)}
            key={post.postId}
          />
        )
      })}
    </div>
  )
}

export default PostsList
