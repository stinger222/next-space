"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { SignInOutButton } from "../ui/SignInOutButton"

const Header = () => {
  const navMenuRef = useRef<HTMLElement | null>(null)

  const toggleNavMenu = () => {
    navMenuRef.current?.classList.toggle("translate-x-[-100%]")
    navMenuRef.current?.classList.toggle("opacity-0")
  }

  const closeNavMenu = () => {
    navMenuRef.current?.classList.add("translate-x-[-100%]")
    navMenuRef.current?.classList.add("opacity-0")
  }

  return (
    <header className="container relative flex justify-between p-3 mb-3 bg-blue-600 select-none xs:items-center">
      <Link
        href="/"
        onClick={closeNavMenu}
      >
        <Image
          src="/logo.svg"
          alt="Next Space"
          width={180}
          height={30}
        />
      </Link>

      <button onClick={toggleNavMenu}>
        <svg 
          className="inline-block cursor-pointer active:scale-95 xs:hidden"
          height="30"
          width="30"
          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M5 12H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"></path> <path d="M5 17H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"></path> <path d="M5 7H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"></path> </g>
        </svg>
      </button>

      <nav
        className="absolute left-0 right-0 py-3 transition-all duration-500 ease-out translate-x-[-100%] opacity-0
        bg-blue-600 border-t-2 border-blue-400 top-full xs:static xs:translate-x-0 xs:opacity-100 xs:block xs:border-none"
        ref={navMenuRef}
      >
        <ul className="relative flex flex-col gap-3 pl-4 text-white underline xs:flex-row xs:no-underline">
          <li>
            <Link
              href="/about"
              onClick={closeNavMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/posts"
              onClick={closeNavMenu}
            >
              Posts
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              onClick={closeNavMenu}
            >
              Users
            </Link>
          </li>
          <li className="-order-1 xs:order-none">
            <SignInOutButton />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
