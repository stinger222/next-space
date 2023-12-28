import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import ErrorPage from "@/app/components/common/ErrorPage"
import avatarPlaceholder from "@/public/avatar-placeholder-light.png"
interface IProps {
	params: {
    id: string
  }
}

const Followers = async ({ params }: IProps) => {
  const profileOwner = await prisma.user.findUnique({
    where: {
      id: params.id
    }
  })

  const followers = await prisma.follow.findMany({
    where: {
      followingId: params.id
    },
    include: {
      follower: true
    }
  })
  
  if (!profileOwner) return (
    <ErrorPage
      header="User not found"
      description="Couldn't find the user you are looking for.&nbsp;Please check the ID and try again."
    />
  )
  
  if (followers?.length === 0) return <h1>No one follows this user :(</h1>

	return (
		<div>
      <Link href={`/users/${profileOwner.id}`} className="flex gap-5">
        <Image
          alt="User's avatar"
          height={100}
          width={100}
          src={profileOwner.image || avatarPlaceholder}
          className="p-1 border border-gray-200 rounded-full shadow-lg shadow-gray-400 box-content"
        />
        <div className="flex flex-col justify-center gap-3">
          <h1 className="text-[40px] font-medium">{profileOwner.name}&rsquo;s</h1>
          <h2 className="font-normal text-gray-500 text-[22px]">Followers</h2>
        </div>
      </Link>

      <section className="pt-10 grid grid-cols-2 grid-rows-2 gap-4">
      {
        followers.map(({ follower }) => (
          <Link
            href={`/users/${follower.id}`}
            className="p-5 border border-gray-300 rounded-xl shadow-md shadow-gray-200 flex gap-6 items-center"
            key={follower.id}
          >
            <Image
              alt="Follower's avatar"
              height={80}
              width={80}
              src={follower.image || avatarPlaceholder}
              className="p-1 border border-gray-200 rounded-full shadow-lg shadow-gray-400 box-content"
            />

            <h3 className="text-3xl font-light max-lines-2">{follower.name}</h3>
          </Link>
        ))
      }
      </section>
		</div>
	)
}

export default Followers
