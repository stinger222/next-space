"use client"

import { PostModel } from "@/types/types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

// TODO: Move out to utils
const messageNotEmpty = (s: string) => {
  return s.trim().length > 0
}

interface IProps {
  onPostCreation: (updatedPosts: PostModel[]) => void
}

const PostCreationForm = ({ onPostCreation }: IProps) => {
  const session = useSession()
  const router = useRouter()

  const methods = useForm({
    defaultValues: {
      postMessage: ""
    }
  })

  const onSubmit = async (values: { postMessage: string }) => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          postMessage: values.postMessage,
          authorName: session.data?.user?.name || "<Nameless User>"
        }),
        headers: {
          "Content-type": "application/json"
        }
      })

      methods.reset()

      onPostCreation((await response.json()).posts)
    } catch (err) {
      console.error("Can't create post: ", err)
    }
  }

  if (session.status === "unauthenticated") router.push("/api/auth/signin")

  return (
    <form
      className="mb-5 flex gap-3 sm:mb-8"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <input
        {...methods.register("postMessage", { validate: messageNotEmpty })}
        placeholder="What's new?"
        className="bg-white border border-gray-300 shadow-none text-xl"
      />
      <button
        type="submit"
        className="btn border-gray-300"
        disabled={methods.formState.isSubmitting}
      >
        &gt;
      </button>
    </form>
  )
}

export default PostCreationForm
