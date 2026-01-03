"use client"

import type React from "react"
import { useState } from "react"
import type { Ticket } from "@/types"

interface TicketCreateProps {
  onSubmit: (ticket: Omit<Ticket, "id" | "createdAt" | "userId">) => void
  onCancel: () => void
}

export function TicketCreate({ onSubmit, onCancel }: TicketCreateProps) {
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<Ticket["category"]>("General")
  const [priority, setPriority] = useState<Ticket["priority"]>("Medium")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!subject.trim()) {
      newErrors.subject = "Subject is required"
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
      subject,
      description,
      category,
      priority,
      status: "Open",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={onCancel}
          className="text-green-600 hover:text-green-700 font-semibold mb-4 flex items-center gap-2"
        >
          ← Back to Tickets
        </button>
        <h1 className="text-4xl font-bold text-gray-900">Create New Ticket</h1>
        <p className="text-gray-600 mt-2">Describe your issue and we'll help you resolve it</p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Ticket Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief subject of the ticket..."
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-400 ${
                errors.subject ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.subject && <p className="text-red-600 text-sm mt-2">✗ {errors.subject}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Detailed Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about the issue..."
              rows={6}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-400 resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && <p className="text-red-600 text-sm mt-2">✗ {errors.description}</p>}
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Ticket["category"])}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white text-gray-900"
              >
                <option value="Technical">🔧 Technical</option>
                <option value="Billing">💳 Billing</option>
                <option value="General">❓ General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Ticket["priority"])}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white text-gray-900"
              >
                <option value="Low">🟦 Low</option>
                <option value="Medium">🟨 Medium</option>
                <option value="High">🟥 High</option>
              </select>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3">Preview</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Subject:</span>
                <span className="font-semibold text-gray-900 ml-2">{subject || "Not entered"}</span>
              </div>
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="font-semibold text-gray-900 ml-2">{category}</span>
              </div>
              <div>
                <span className="text-gray-600">Priority:</span>
                <span className="font-semibold text-gray-900 ml-2">{priority}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-lg"
            >
              Create Ticket
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
