"use client"

import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TicketHub</h1>
          <p className="text-gray-600">Manage your support tickets efficiently</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sign In</h2>
          <LoginForm />
        </div>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-green-600 hover:text-green-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
