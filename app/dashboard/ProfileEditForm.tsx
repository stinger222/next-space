"use client"

import { api } from "@/lib/api"
import { IUser, prisma } from "@/lib/prisma"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Loader from "../components/common/Loader"

interface IProps {
  user: IUser
}

interface IForm {
  name: string
  age: string
  image: string
  bio: string
}

const ProfileEditForm = ({ user }: IProps) => {
  const session = useSession()
  const router = useRouter()

  const { handleSubmit, register, reset, formState } = useForm<IForm>({
    defaultValues: {
      name: user.name || "",
      age: user.age?.toString() || "",
      image: user.image || "",
      bio: user.bio || ""
    },
    mode: "all"
  })

  const onSubmit = (values: IForm) => {
    
    return api
    .put("api/users", values)
    .then(() => router.push("/api/users/me"))
    .catch((err) => {
      reset()
      console.error("Can't update user profile:\n", err)
    })
    
    // return new Promise((res) => setTimeout(res, 3000))
  }

  if (session.status === "loading") return <Loader />

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:mx-auto sm:max-w-[70%]">
        <p className="text-red-500">{formState.errors.name?.message}</p>
        <input
          {...register("name", {
            required: "No name? :((((",
            minLength: { value: 4, message: "That's kinda small..." },
            maxLength: { value: 30, message: "😶 Impressive, but... a little to long" }
          })}
          placeholder="Name"
          className="mb-3"
        />

        <p className="text-red-500">{formState.errors.age?.message}</p>
        <input
          {...register("age", {
            min: { value: 5, message: "For real? no." },
            max: { value: 99, message: "Come on, you can't be THAT old" }
          })}
          type="number"
          placeholder="Age"
          className="mb-3"
        />

        <p className="text-red-500">{formState.errors.image?.message}</p>
        <input
          {...register("image", {
            pattern: { value: /^https:\/\/.{0,}/, message: 'URL should start with "https://"' }
          })}
          placeholder="Avatar URL"
          className="mb-3"
        />

        <textarea
          {...register("bio", {})}
          placeholder="Couple words about youself?"
          className="box-border min-h-[3em] h-20"
        />
      </div>

      <button
        className="block mx-auto my-8 px-7 py-1 text-xl text-gray-800 font-semibold border-2 border-gray-800 rounded-lg disabled:opacity-40"
        type="submit"
        disabled={!formState.isValid || formState.isSubmitting}
      >
        Save
      </button>
    </form>
  )
}

export default ProfileEditForm
