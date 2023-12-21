"use client"

import { PostModelNoAuthor } from "@/types/types"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import PostCreationForm from "./PostCreationForm"
import PostsList from "./PostsList"

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
    fetch(`/api/users/${targetUserId}`, {
      cache: "no-cache",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((response) => {
        setLoading(false)
        return response.json()
      })
      .then((user) => setPosts(user.posts))
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
