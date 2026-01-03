"use client"

import type React from "react"
import { useState } from "react"
import type { Ticket } from "@/types"

interface TicketEditProps {
  ticket: Ticket
  onSubmit: (ticket: Omit<Ticket, "id" | "createdAt" | "userId">) => void
  onCancel: () => void
}

export function TicketEdit({ ticket, onSubmit, onCancel }: TicketEditProps) {
  const [subject, setSubject] = useState(ticket.subject)
  const [description, setDescription] = useState(ticket.description)
  const [category, setCategory] = useState<Ticket["category"]>(ticket.category)
  const [priority, setPriority] = useState<Ticket["priority"]>(ticket.priority)
  const [status, setStatus] = useState<Ticket["status"]>(ticket.status)
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
      status,
    })
  }

  const getStatusColor = (stat: Ticket["status"]) => {
    switch (stat) {
      case "Open":
        return "from-red-500 to-red-600"
      case "In Progress":
        return "from-yellow-500 to-yellow-600"
      case "Resolved":
        return "from-green-500 to-green-600"
    }
  }

  const getPriorityColor = (prio: Ticket["priority"]) => {
    switch (prio) {
      case "High":
        return "from-red-50 to-red-100 border-red-200"
      case "Medium":
        return "from-yellow-50 to-yellow-100 border-yellow-200"
      case "Low":
        return "from-blue-50 to-blue-100 border-blue-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Edit Ticket</h1>
            <p className="text-gray-600 mt-2">Update ticket details and status</p>
          </div>
          <div className={`bg-gradient-to-r ${getStatusColor(status)} text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg`}>
            {status}
          </div>
        </div>
      </div>

      {/* Ticket Info Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600 font-semibold">Ticket ID</p>
            <p className="text-gray-900 font-mono">{ticket.id}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Created</p>
            <p className="text-gray-900">{formatDate(ticket.createdAt)}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Category</p>
            <p className="text-gray-900">{ticket.category}</p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
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
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white text-gray-900 ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.subject && <p className="text-red-600 text-sm mt-2">✗ {errors.subject}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white text-gray-900 resize-none ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && <p className="text-red-600 text-sm mt-2">✗ {errors.description}</p>}
              </div>

              {/* Priority and Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    Priority
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

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["Open", "In Progress", "Resolved"] as const).map((stat) => (
                    <button
                      key={stat}
                      type="button"
                      onClick={() => setStatus(stat)}
                      className={`px-4 py-3 rounded-lg font-semibold transition ${
                        status === stat
                          ? `bg-gradient-to-r ${getStatusColor(stat)} text-white shadow-lg`
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {stat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-lg"
                >
                  Save Changes
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Priority Card */}
          <div className={`bg-gradient-to-br ${getPriorityColor(priority)} border rounded-lg p-6 shadow-md`}>
            <h3 className="font-bold text-gray-900 mb-2">Priority Level</h3>
            <p className="text-lg font-bold text-gray-900">{priority}</p>
          </div>

          {/* Status Info */}
          <div className={`bg-gradient-to-br ${getStatusColor(status)} text-white rounded-lg p-6 shadow-lg`}>
            <h3 className="font-bold mb-2">Current Status</h3>
            <p className="text-2xl font-bold">{status}</p>
            <p className="text-sm mt-3 opacity-90">Last updated: {formatDate(new Date().toISOString())}</p>
          </div>

          {/* Quick Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">Quick Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-semibold">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-semibold">Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
