"use client"

import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left Side - Description */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 to-green-600 text-white flex-col justify-center px-12 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl text-green-100">Sign in to manage your support tickets</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl mt-1">🎫</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Manage Tickets</h3>
                <p className="text-green-100">Create, update, and track all your support tickets in one place</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl mt-1">⚡</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fast & Responsive</h3>
                <p className="text-green-100">Lightning-fast performance optimized for all devices</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl mt-1">🔒</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure</h3>
                <p className="text-green-100">Your data is encrypted and protected with modern security</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 py-8">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900">TicketHub</h1>
            <p className="text-gray-600 mt-2">Support Ticket Management</p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 mb-8">Enter your credentials to access your account</p>
            <LoginForm />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-8">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-600 hover:text-green-700 font-bold transition">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
