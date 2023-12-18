import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Next Space | About",
  description: "This is simple Next.js practice app"
}

const About = () => {
  return (
    <div>
      <h1 className="mt-10 mb-2 text-4xl font-bold text-red-500">TODO</h1>
      <hr />
      <p className="mt-3 text-xl text-red-500">Make this page look like readme or something</p>
      <br/>
      <br/>
      <br/>
      <h1 className="mt-10 mb-2 text-4xl font-semibold">What is this app?</h1>
      <hr />
      <p className="mt-3">Nothing more than a practice to master Next.js basics</p>

      <h1 className="mt-16 mb-2 text-4xl font-semibold">About us</h1>
      <hr />
      <p className="mt-3">Кто us, я тут один(((</p>
    </div>
  )
}

export default About
