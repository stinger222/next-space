import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"

export default async function Home() {
  const session = await getServerSession()

  return (
    <div>
      <h1>Name: {session?.user?.name}</h1>
      <h1>Data:</h1>
      <pre>{JSON.stringify(session?.user)}</pre>
      <h1>This is home page, and there is nothing here...</h1>
    </div>
  )
}
