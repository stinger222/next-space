"use client"

import { Prisma } from "@prisma/client"
import Button from "../../ui/Button"
import { Session } from "next-auth"
import { useState } from "react"
import { api } from "@/lib/api"

interface IProps {
	session: Session | null,
  profileOwner: Prisma.UserGetPayload<{ include: { followedBy: true } }>
}

const FollowButton = ({ session, profileOwner }: IProps) => {
  const currentUserIsOwner = session?.user?.id === profileOwner.id  
  const [isFetching, setIsFetching] = useState(false)
  const [currentUserIsFollower, setCurrentUserIsFollower] = useState(() => (
    profileOwner?.followedBy.some((followEdge) => followEdge.followerId === session?.user?.id)
  ))
    
  const handleFollowUnfollow = () => {
    setIsFetching(true)
    if (currentUserIsFollower) {
      api
        .delete("api/follow", { data: { targetUserId: profileOwner.id } })
        .then(() => setCurrentUserIsFollower(prev => !prev))
        .catch((err) => console.error("Can't unfollow:\n", err))
        .finally(() => setIsFetching(false))
    } else {
      api
        .post("api/follow", { targetUserId: profileOwner.id })
        .then(() => setCurrentUserIsFollower(prev => !prev))
        .catch((err) => console.error("Can't follow:\n", err))
        .finally(() => setIsFetching(false))
    }
  }

  if (currentUserIsOwner || !session?.user?.id) return
  
	return (
    <Button
      disabled={isFetching}
      variant="dark"
      onClick={handleFollowUnfollow}
    >
      {currentUserIsFollower ? "Unfollow" : "Follow"}
    </Button>

	)
}

export default FollowButton
