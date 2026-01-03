"use client"

import { useRouter } from "next/navigation"
import { authApi } from "@/api"

interface HeaderProps {
  userEmail?: string
}

export function Header({ userEmail }: HeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      authApi.clearUser()
      router.push("/login")
    }
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">TicketHub</h1>

        <div className="flex items-center gap-4">
          {userEmail && <span className="text-sm text-gray-600">{userEmail}</span>}
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
