import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

 const Home = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <h2>Name: {session?.user?.name}</h2>
      <h2>Data:</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h2>This is home page, and there is nothing here...</h2>
    </div>
  )
}

export default Home