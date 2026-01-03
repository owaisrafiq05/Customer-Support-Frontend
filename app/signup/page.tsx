"use client"

import Link from "next/link"
import { SignupForm } from "@/components/auth/SignupForm"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left Side - Description */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-blue-600 text-white flex-col justify-center px-12 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold mb-4">Join Us Today</h1>
            <p className="text-xl text-blue-100">Create your account and start managing tickets</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl mt-1">👥</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Easy Signup</h3>
                <p className="text-blue-100">Create your account in just a few clicks</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl mt-1">📊</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
                <p className="text-blue-100">View analytics and track your ticket progress</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl mt-1">🎯</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
                <p className="text-blue-100">Keep all your support tickets organized in one place</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600 mb-8">Sign up to get started with ticket management</p>
            <SignupForm />
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
