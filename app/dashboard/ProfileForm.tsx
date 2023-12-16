"use client"

import { IUser, prisma } from "@/lib/prisma"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

interface IProps {
	user: IUser
}

interface IForm {
  name: string,
  age: string
  image: string
  bio: string
}

const ProfileEditForm = ({ user }: IProps) => {
  const router = useRouter()

  const { handleSubmit, register, reset } = useForm<IForm>({
    defaultValues: {
      name: user.name || "",
      age: user.age?.toString() || "",
      image: user.image || "",
      bio: user.bio || ""
    }
  })

  const onSubmit = ({name, age, image, bio}: IForm) => {
    fetch(`/api/users`, {
      method: "PUT",
      body: JSON.stringify({
        id: user.id, name, image, bio, age
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(() => router.push("/")).catch(() => reset())
  }

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:mx-auto sm:max-w-[70%]">
        <input
          {...register("name", {
            required: "Required",
            minLength: 4,
            maxLength: 30
          })}
          placeholder="Name"
        />
        <input
          {...register("age", {
            min: {value: 5, message: "For real? no."},
            max: {value: 99, message: "Come on, you can't be THAT old"}
          })}
          type="number"
          placeholder="Age"
        />
        <input
          {...register("image", {
            pattern: {value: /^https:\/\/.{0,}/, message: "URL should start with \"https://\""}
          })}
          placeholder="Avatar URL"
        />
        <textarea
          {...register("bio", {
          })}
          placeholder="Couple words about youself?"
          className="box-border min-h-[3em] h-20"
        />
      </div>

      <button
        className="block mx-auto my-8 px-7 py-1 text-xl text-gray-400 font-semibold border-2 border-gray-400 rounded-lg"
        type="submit"
      >Edit
      </button>
		</form>
	)
}

export default ProfileEditForm
