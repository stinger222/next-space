"use client"

import { PostModelNoAuthor, UserModelWithPosts } from "@/types/types"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import PostCreationForm from "./PostCreationForm"
import PostsList from "./PostsList"
import { api } from "@/lib/api"
import { AxiosResponse } from "axios"

interface IProps {
  targetUserId: string // id of profile owner
  authorName: string
}

const PostsSection = ({ targetUserId, authorName }: IProps) => {
  const currentUserId = useSession().data?.user?.id // id of currently authorized user
  const [posts, setPosts] = useState<PostModelNoAuthor[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  const currentUserIsOwner = currentUserId === targetUserId
  
  // Fetch target user' posts
  useEffect(() => {
    api
      .get(`api/users/${targetUserId}`)
      .then((response: AxiosResponse<UserModelWithPosts>) => {
        setPosts(response.data.posts)
      })
      .catch((err) => {
        console.error("Can't fetch user:\n", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [targetUserId])
  
  return (
    <div>
      <h2 className="pt-8 pb-3">Posts:</h2>
      {currentUserIsOwner && 
        <PostCreationForm onPostCreation={setPosts} />
      }
      <PostsList
        posts={posts}
        authorName={authorName}
        loading={loading}
        currentUserIsOwner={currentUserIsOwner}
        onPostDeletion={setPosts}
      />
    </div>
  )
}

export default PostsSection
