import { Metadata } from "next"
import Link from "next/link"
import GitIcon from "@/public/github.svg"

export const metadata: Metadata = {
  title: "NextSpace | About",
  description: "This is simple Next.js practice app"
}

const About = () => {
  return (
    <div>
      <h1 className="mt-5">What is this app?</h1>
      <hr className="mt-2 mb-5"/>
      <p className="text-lg">
        This is a practical project that helped me to grasp essential Next.js 13 famework features while building simple social platform with a handful of basic features
      </p>

      <h1 className="mt-8">Features</h1>
      <hr className="mt-2 mb-5"/>
      <ul className="list-disc px-8 text-lg">
        <li>Create and delete twitter-like messages on&nbsp;
          <Link href="/api/users/me" className="link">your profile page</Link>
        </li>
        <li>Follow&nbsp;
          <Link href="/users" className="link">users</Link>
          &nbsp;and&nbsp;
          <Link href="/followed" className="link">keep track</Link>
          &nbsp;of what they post</li>
        <li>
          <Link href="/dashboard" className="link">Edit</Link>
          &nbsp;your profile info
        </li>
      </ul>

      <div className="fixed left-0 right-0 bottom-10 flex flex-col items-center gap-3 text-2xl font-light">
        <span>
          More info on&nbsp;
          <Link href="https://github.com/stinger222/next-space" className="font-semibold" target="_blank">GitHub</Link>
        </span>
        <Link href="https://github.com/stinger222/next-space" target="_blank">
          <GitIcon className="h-9 w-9 fill-black"/>
        </Link>
      </div>
    </div>
  )
}

export default About
