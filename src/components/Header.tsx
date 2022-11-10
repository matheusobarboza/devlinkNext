import Link from "next/link"
import { SignOut } from "phosphor-react"
import { useContext } from "react"
import { AuthContext } from "../hooks/AuthContext"

export const Header = () => {
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await logoutUser()
  }

  return (
    <header className="w-full max-w-[720px] mt-4 mb-7 px-4">
      <nav className="w-full bg-white h-12 flex items-center rounded">
        <button onClick={handleLogout} className="bg-transparent mr-6 ml-2">
          <SignOut size={28} color="#db2629" />
        </button>

        <Link href="/admin" className="mr-4 text-zinc-700 font-medium hover:text-zinc-500 transition-colors">
          Links
        </Link>

        <Link href="/admin/social" className="mr-4 text-zinc-700 font-medium hover:text-zinc-500 transition-colors">
          Redes Sociais
        </Link>
      </nav>
    </header>
  )
}