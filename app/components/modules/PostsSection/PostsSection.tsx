"use client"

import { useEffect, useState } from "react"
import PostCreationForm from "./PostCreationForm"
import PostsList from "./PostsList"
import { useSession } from "next-auth/react"
import { PostModel } from "@/types/types"

interface IProps {
  targetUserId: string // id of profile owner
  ownerName: string
}

const PostsSection = ({ targetUserId, ownerName }: IProps) => {
  const currentUserId = useSession().data?.user?.id // id of authorized user
  const [posts, setPosts] = useState<PostModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  const currentUserIsOwner = currentUserId === targetUserId
  
  useEffect(() => {
    fetch(`/api/users/${targetUserId}`, {  // all posts? maybe posts for targetUser?
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
        ownerName={ownerName}
        loading={loading}
        currentUserIsOwner={currentUserIsOwner}
        onPostDeletion={setPosts}
      />
    </div>
  )
}

export default PostsSection
