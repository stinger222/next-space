import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/common/Header"
import AuthProvider from "./AuthProvider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata = {
  title: "NextSpace | Home"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster richColors position="top-left"/>
          <Header />
          <main className="container">{children}</main>
        </body>
      </html>
    </AuthProvider>
  )
}
