import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { IPostAuthor } from "@/types/types"
import { prisma } from "@/lib/prisma"
import { authOptions } from "../api/auth/[...nextauth]/route"
import PostCard from "../components/common/PostCard"

export const metadata = {
  title: "NextSpace | Followed",
  description: "Posts of users you follow"
}

const Followed = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/api/auth/signin")
  
  const currentUser = await prisma.user.findUnique({
    where: {
      id: session.user!.id!
    },
    select: {
      following: true
    }
  })

  const followedPosts = await prisma.post.findMany({
    where: {
      authorId: {
        in: currentUser?.following.map(xx => xx.followingId)
      }
    },
    include: {
      author: true
    }
  })

	return (
		<main>
			<h1 className="mb-10">Followed Posts</h1>
      <div className="flex flex-col-reverse">
        {
          followedPosts.map(post => {
            
            const author: IPostAuthor = {
              name: post.author.name,
              id: post.author.id,
              image: post.author.image
            }
            
            return (
              <PostCard
                key={post.postId}
                author={author}
                editable={false}
                postMessage={post.postMessage}
              />
            )
          })
        }
      </div>
		</main>
	)
}

export default Followed
