"use client"

import type React from "react"
import { useState } from "react"
import { 
  ArrowLeftIcon,
  XMarkIcon,
  WrenchScrewdriverIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline"
import type { Ticket } from "@/types"

interface TicketCreateProps {
  onSubmit: (ticket: Omit<Ticket, "_id" | "createdAt" | "createdBy">) => void
  onCancel: () => void
}

export function TicketCreate({ onSubmit, onCancel }: TicketCreateProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("general")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }
    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    onSubmit({
      title,
      description,
      category,
      priority: "medium",
      status: "open",
    })
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="relative">
        <button
          onClick={onCancel}
          className="text-green-600 hover:text-green-700 font-semibold mb-6 flex items-center gap-2 transition-all hover:gap-3 group"
        >
          <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Tickets
        </button>
        <div className="text-center">
          <h1 className="text-5xl font-bold gradient-text mb-4">Create New Ticket</h1>
          <p className="text-gray-600 text-lg font-medium">Describe your issue and we'll help you resolve it quickly</p>
        </div>
      </div>

      {/* Form Container */}
      <div className="glass rounded-2xl shadow-2xl p-8 border border-green-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Subject */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Ticket Subject
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief title of the ticket..."
              className={`w-full px-6 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all bg-white/80 text-gray-900 placeholder-gray-400 font-medium shadow-sm hover:shadow-md ${
                errors.title ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200"
              }`}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-2 flex items-center gap-2 font-medium">
                <XMarkIcon className="w-4 h-4" /> {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Detailed Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about the issue..."
              rows={6}
              className={`w-full px-6 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all bg-white/80 text-gray-900 placeholder-gray-400 resize-none font-medium shadow-sm hover:shadow-md ${
                errors.description ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200"
              }`}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-2 flex items-center gap-2 font-medium">
                <XMarkIcon className="w-4 h-4" /> {errors.description}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all bg-white/80 text-gray-900 font-medium shadow-sm hover:shadow-md"
            >
              <option value="technical">Technical Support</option>
              <option value="billing">Billing & Payments</option>
              <option value="general">General Inquiry</option>
              <option value="feature_request">Feature Request</option>
              <option value="bug_report">Bug Report</option>
            </select>
          </div>

          {/* Enhanced Preview Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-100 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-6 text-lg flex items-center gap-2">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
              Ticket Preview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-gray-600 font-medium text-sm">Title</span>
                <p className="font-semibold text-gray-900 text-lg">{title || "Not entered yet"}</p>
              </div>
              <div className="space-y-2">
                <span className="text-gray-600 font-medium text-sm">Category</span>
                <p className="font-semibold text-gray-900">{category}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Buttons */}
          <div className="flex gap-4 pt-8">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-xl shadow-lg active:scale-[0.98] focus:ring-4 focus:ring-green-500/30"
            >
              Create Ticket
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg focus:ring-4 focus:ring-gray-300/30"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
