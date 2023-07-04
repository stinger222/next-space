import Image from "next/image"
import Link from "next/link"

const NavMenu = () => {
  return (
    <header className="p-3 flex items-center justify-between bg-blue-600">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Next Space"
          width={180}
          height={30}
        />
      </Link>
      <nav>
        <ul className="flex gap-3 text-white">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavMenu
