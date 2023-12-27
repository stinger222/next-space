"use client"

import { PostModelNoAuthor, UserModelWithPosts } from "@/types/types"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import PostCreationForm from "./PostCreationForm"
import PostsList from "./PostsList"
import { api } from "@/lib/api"
import { AxiosResponse } from "axios"
import { Prisma } from "@prisma/client"

interface IProps {
  targetUser: Prisma.UserGetPayload<{ include: { posts: true } }>
}

const PostsSection = ({ targetUser }: IProps) => {
  const session = useSession()  // id of currently authorized user
  const currentUserId = session.data?.user?.id  // id of currently authorized user
  const [posts, setPosts] = useState<PostModelNoAuthor[]>(targetUser.posts)
  const [loading, setLoading] = useState<boolean>(true)
  
  const currentUserIsOwner = currentUserId === targetUser.id
  
  // Fetch target user' posts
  useEffect(() => {
    api
      .get(`api/users/${targetUser.id}`)
      .then((response: AxiosResponse<UserModelWithPosts>) => {
        setPosts(response.data.posts)
      })
      .catch((err) => {
        console.error("Can't fetch user:\n", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [targetUser.id])
  
  return (
    <section>
      <h2 className="pt-8 pb-3">Posts:</h2>
      {currentUserIsOwner && 
        <PostCreationForm onPostCreation={setPosts} />
      }
      <PostsList
        posts={posts}
        loading={loading}
        currentUserIsOwner={currentUserIsOwner}
        onPostDeletion={setPosts}
        author={targetUser}
      />
    </section>
  )
}

export default PostsSection
