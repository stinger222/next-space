"use client"

import { api } from "@/lib/api"
import { PostModelWithAuthor } from "@/types/types"
import { AxiosResponse } from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

// TODO: Move out to utils
const messageNotEmpty = (s: string) => {
  return s.trim().length > 0
}

interface IProps {
  onPostCreation: (updatedPosts: PostModelWithAuthor[]) => void
}

const PostCreationForm = ({ onPostCreation }: IProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const session = useSession()
  const router = useRouter()

  const methods = useForm({
    defaultValues: {
      postMessage: ""
    },
    mode: "onChange"
  })

  const onSubmit = (values: { postMessage: string }) => {
    console.log("\nTrying to create new post...")
    setIsCreating(true)

    api
      .post("api/posts", {
        postMessage: values.postMessage,
        authorName: session.data?.user?.name || `@${session.data?.user?.id?.substring(0, 6)}`
      })
      .then((response: AxiosResponse<{ posts: PostModelWithAuthor[] }>) => {
        methods.reset()
        onPostCreation(response.data.posts)
        console.log("Post successfully created!")
      })
      .catch((err) => console.error("Can't create post: ", err))
      .finally(() => setIsCreating(false))
  }

  if (session.status === "unauthenticated") router.push("/api/auth/signin")

  return (
    <form
      className="mb-5 flex gap-3 relative sm:mb-8"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <input
        {...methods.register("postMessage", {
          validate: messageNotEmpty,
          maxLength: { value: 200, message: "Max length is 200 symbols" }
        })}
        placeholder="What's new?"
        disabled={isCreating}
        className="bg-white border border-gray-300 shadow-none text-xl disabled:opacity-50"
      />
      <button
        type="submit"
        className="btn border-gray-300"
        disabled={methods.formState.isSubmitting || !!methods.formState.errors.postMessage}
      >
        &gt;
      </button>

      <p className="absolute -bottom-6 left-3 font-semibold text-red-500">{methods.formState.errors.postMessage?.message}</p>
      
    </form>
  )
}

export default PostCreationForm
