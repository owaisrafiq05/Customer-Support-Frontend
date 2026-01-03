"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth"

export function SignupForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    const result = auth.signup(email, password)

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error || "Signup failed")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <span>❌</span>
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-400"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 shadow-lg"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  )
}
