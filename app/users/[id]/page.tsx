import PostCreationForm from "@/app/components/common/PostCreationForm"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

interface IProps {
  params: {
    id: string
  }
}

export const generateMetadata = async ({ params }: Pick<IProps, "params">) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } })
  return { title: `${user?.name}'s User Profile` }
}

const UserProfile = async ({ params }: IProps) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex flex-col align-bottom items-center w-full sm:max-w-fit ">
          <h1 className="text-4xl mb-5 w-full text-center max-w-sm max-lines-2">{user?.name}</h1>

          <Image
            className="mx-auto min-w-[10em] rounded-full border-2 border-gray-300 p-1 shadow-lg shadow-gray-400"
            width="250"
            height="250"
            src={user?.image || require("../../../public/logo.svg")}
            alt="User's Avatar"
          />
        </div>

        <div className="">
          <h3>Bio:</h3>
          <p>{user?.bio || "This user didn't provided anything here :("}</p>
          <h3>Age:</h3>
          <p>{user?.age || "???"}</p>
        </div>
      </div>

      <div>
        <h2 className="pt-8 pb-3">Posts:</h2>
        <PostCreationForm />
        {/* <PostsList /> */}

        {/* <div className="py-2 px-4 mb-4 bg-gray-100 rounded-xl">
          <h3 className="py-2 font-semibold">Im a post card (kinda)</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quas rerum nisi nam quidem non
            harum voluptatem assumenda placeat aliquam!
          </p>
          P
        </div>
        <div className="py-2 px-4 mb-4 bg-gray-100 rounded-xl">
          <h3 className="py-2 font-semibold">Im a post card (kinda)</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quas rerum nisi nam quidem non
            harum voluptatem assumenda placeat aliquam!
          </p>
        </div>
        <div className="py-2 px-4 mb-4 bg-gray-100 rounded-xl">
          <h3 className="py-2 font-semibold">Im a post card (kinda)</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quas rerum nisi nam quidem non
            harum voluptatem assumenda placeat aliquam!
          </p>
        </div>
        <div className="py-2 px-4 mb-4 bg-gray-100 rounded-xl">
          <h3 className="py-2 font-semibold">Im a post card (kinda)</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quas rerum nisi nam quidem non
            harum voluptatem assumenda placeat aliquam!
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default UserProfile
