"use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { auth } from "@/lib/auth"

export default function HomePage() {
  // const router = useRouter()

  // useEffect(() => {
  //   const user = auth.getCurrentUser()
  //   if (user) {
  //     router.push("/dashboard")
  //   } else {
  //     router.push("/login")
  //   }
  // }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}
