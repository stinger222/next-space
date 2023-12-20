import { PostModel } from "@/types/types"

interface IProps {
	editable: boolean,
  ownerName: string,
  post: PostModel,
  onDelete?: (postId: string) => void
}

const PostCard = ({ editable = false, ownerName, post, onDelete }: IProps) => {
	return (
    <div className="relative py-2 px-4 mb-4 bg-gray-100 rounded-xl">
      <h3 className="py-2 font-semibold">{ownerName}</h3>
      <p className="pl-2 text-xl font-mono break-words">{post.postMessage}</p>
      
      {editable &&
        <button
          onClick={() => onDelete?.(post.postId)}
          className="absolute top-5 right-5 font-semibold text-lg text-gray-400 hover:text-gray-600 active:scale-90"
        >
          X
        </button>
      }
    </div>
	)
}

export default PostCard
