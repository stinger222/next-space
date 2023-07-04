import "./globals.css"
import { Inter } from "next/font/google"
import NavMenu from "./components/NavMenu"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata = {
  title: "Next Space | Home"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container">
          <NavMenu />
          {children}
        </main>
      </body>
    </html>
  )
}
