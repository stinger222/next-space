import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"

export default async function Home() {
  const session = await getServerSession()

  return (
    <div>
      <h2>Name: {session?.user?.name}</h2>
      <h2>Data:</h2>
      <pre>{JSON.stringify(session?.user)}</pre>
      <h2>This is home page, and there is nothing here...</h2>
    </div>
  )
}
