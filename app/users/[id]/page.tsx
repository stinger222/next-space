import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import Button from "@/app/components/ui/Button"
import ErrorPage from "@/app/components/common/ErrorPage"
import FollowButton from "@/app/components/modules/FollowSetion/FollowButton"
import PostsSection from "@/app/components/modules/PostsSection/PostsSection"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import placeholder from "@/public/avatar-placeholder.png"
import { ReactElement } from "react"
import EditIcon from "@/public/edit.svg"

interface IProps {
  params: {
    id: string
  }
}

export const generateMetadata = async ({ params }: IProps) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } })
  return { title: `${user?.name}'s User Profile` }
}

const UserProfile = async ({ params }: IProps) => {
  const session = await getServerSession(authOptions)

  const profileOwner = await prisma.user.findUnique({
    where: { id: params.id },
    include: { followedBy: true, posts: true }
  })

  const currentUserIsOwner = session?.user?.id === profileOwner?.id

  if (!profileOwner) {
    return (
      <ErrorPage
        header="User not found"
        description="Couldn't find the user you are looking for.&nbsp;Please check the ID and try again."
      />
    )
  }
  
  return (
    <main className="flex flex-col gap-5">
      <section className="relative flex flex-col gap-7 sm:flex-row">
        <div className="flex flex-col align-bottom items-center w-full sm:max-w-fit ">
          <h1 className="mb-5 w-full text-4xl text-center max-w-sm max-lines-2">
            {profileOwner.name}
          </h1>
          
          {currentUserIsOwner && 
            <Link href="/dashboard">
              <EditIcon className="absolute top-0 right-2 p-1 h-10 w-10 fill-gray-700"/>
            </Link>
          }

          <Image
            className="mx-auto min-w-[10em] rounded-full border-2 border-gray-300 p-1 shadow-lg shadow-gray-400 #23c9f3"
            width="250"
            height="250"
            src={profileOwner?.image || placeholder}
            alt="User's Avatar"
          />

          <div className="flex gap-2 mt-8">
            <Link href={`/users/${profileOwner.id}/followers`}>
              <Button variant="light">
                Followers
                <span className="ml-2 font-normal text-slate-400">{profileOwner.followedBy.length}</span>
              </Button>
            </Link>

            <FollowButton session={session} profileOwner={profileOwner}/>
          </div>
        </div>

        <div>
          <RenderIfCoreExists core={profileOwner.age}>
            <h3 className="text-[24px] font-semibold">Age</h3>
            <p>{profileOwner?.age} years old</p>
          </RenderIfCoreExists>
          
          <RenderIfCoreExists core={profileOwner.location}>
            <h3 className="mt-4 text-[24px] font-semibold">Location</h3>
            <p>{profileOwner?.location}</p>
          </RenderIfCoreExists>

          <RenderIfCoreExists core={profileOwner.hometown}>
            <h3 className="mt-4 text-[24px] font-semibold">Hometown</h3>
            <p>{profileOwner?.hometown}</p>
          </RenderIfCoreExists>

          <RenderIfCoreExists core={profileOwner.education}>
            <h3 className="mt-4 text-[24px] font-semibold">Education</h3>
            <p>{profileOwner?.education}</p>
          </RenderIfCoreExists>
          
          <RenderIfCoreExists core={profileOwner.bio}>
            <h3 className="mt-4 text-[24px] font-semibold">Bio</h3>
            <p>{profileOwner?.bio}</p>
          </RenderIfCoreExists>

        </div>
      </section>

      <PostsSection targetUser={profileOwner} />
    </main>
  )
}

const RenderIfCoreExists = ({core, children}: {core: any, children: ReactElement[]}) => {
  if (!core) return 
  
  return <div>
    {children}
  </div>
}

export default UserProfile
