interface IProps {
	editable: boolean,
  authorName: string,
  postMessage: string,
  onDelete?: () => void
}

const PostCard = ({ editable = false, authorName, postMessage, onDelete }: IProps) => {
  return (
    <div className="relative py-2 px-4 mb-4 bg-gray-100 rounded-xl">
      <h3 className="py-2 font-semibold">{authorName}</h3>
      <p className="pl-2 text-xl font-mono break-words">{postMessage}</p>
      
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
