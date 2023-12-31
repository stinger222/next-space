import { Prisma } from "@prisma/client"
import Button from "../../ui/Button"
import { Session } from "next-auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface IProps {
	session: Session | null,
  profileOwner: Prisma.UserGetPayload<{ include: { followedBy: true } }>
}

const FollowButton = async ({ session, profileOwner }: IProps) => {
  const currentUserIsOwner = session?.user?.id === profileOwner.id
  if (currentUserIsOwner || !session?.user?.id) return
  const currentUserIsFollower = profileOwner?.followedBy.some((followEdge) => followEdge.followerId === session?.user?.id)

  const handleFollowUnfollow = async () => {
    "use server"
    try {
      if (currentUserIsFollower) {
        await prisma.follow.delete({
          where: {
            followerId_followingId: {
              followerId: session?.user?.id!,
              followingId: profileOwner.id
            }
          }
        })
      } else {
        await prisma.follow.create({
          data: {
            followerId: session?.user?.id!,
            followingId: profileOwner.id
          }
        })
      }
    } catch(err) {
      console.error("\nCan't perform follow/unfloow action!\n\n", err)
    }

    revalidatePath(`/users/${profileOwner.id}`)
  }
  
	return (
    <form action={handleFollowUnfollow}>
      <Button
        variant="dark"
        type="submit"
      >
        {currentUserIsFollower ? "Unfollow" : "Follow"}
      </Button>
    </form>

	)
}

export default FollowButton
