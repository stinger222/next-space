import ErrorPage from "@/app/components/common/ErrorPage"
import PostsSection from "@/app/components/modules/PostsSection/PostsSection"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

interface IProps {
  params: {
    id: string
  }
}

export const generateMetadata = async ({ params }: Pick<IProps, "params">) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } })
  return { title: `${user?.name || `@${params.id.substring(0, 6)}`}'s User Profile` }
}

const UserProfile = async ({ params }: IProps) => {
  const profileOwner = await prisma.user.findUnique({ where: { id: params.id } })
  const ownerName = profileOwner?.name || `@${params.id.substring(0, 6)}`

  if (!profileOwner) {
    return (
      <ErrorPage
        header="User not found"
        description="Couldn't find the user you are looking for.&nbsp;Please check the ID and try again."
      />
    )
  }
  
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex flex-col align-bottom items-center w-full sm:max-w-fit ">
          <h1 className="text-4xl mb-5 w-full text-center max-w-sm max-lines-2">{ownerName}</h1>

          <Image
            className="mx-auto min-w-[10em] rounded-full border-2 border-gray-300 p-1 shadow-lg shadow-gray-400"
            width="250"
            height="250"
            src={profileOwner?.image || require("../../../public/logo.svg")}
            alt="User's Avatar"
          />
        </div>

        <div>
          <h3>Bio:</h3>
          <p>{profileOwner?.bio || "This user didn't provided anything here :("}</p>
          <h3>Age:</h3>
          <p>{profileOwner?.age || "???"}</p>
        </div>
      </div>

      <PostsSection targetUserId={params.id} authorName={ownerName} />
    </div>
  )
}

export default UserProfile
