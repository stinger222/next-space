import { IPostAuthor } from "@/types/types"
import placeholder from "@/public/avatar-placeholder.png"
import Image from "next/image"
import Link from "next/link"
interface IProps {
	editable: boolean,
  postMessage: string,
  author: IPostAuthor,
  onDelete?: () => void
}

const PostCard = ({ editable = false, author, postMessage, onDelete }: IProps) => {
  return (
    <div className="relative py-2 px-4 mb-4 bg-gray-100 rounded-xl">
      <h3 className="py-2 font-semibold">
        <Link href={`/users/${author.id}`}>
          <Image
            height={40}
            width={40}
            src={author.image || placeholder }
            alt="User Avatar"
            className="inline-block mr-3 p-0.5 shadow-sm shadow-gray-500 rounded-full box-content"
          />
          { author?.name }
        </Link>
      </h3>
        
      <p className="pl-2 text-xl font-mono break-words">{ postMessage }</p>
      
      {editable &&
        <button
          onClick={() => onDelete?.()}
          className="absolute top-5 right-5 font-semibold text-lg text-gray-400 hover:text-gray-600 active:scale-90"
        >
          X
        </button>
      }
    </div>
	)
}

export default PostCard
