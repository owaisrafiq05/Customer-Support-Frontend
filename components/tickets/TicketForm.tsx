"use client"

import type React from "react"

import { useState } from "react"
import type { Ticket } from "@/types"

interface TicketFormProps {
  onSubmit: (ticket: Omit<Ticket, "id" | "createdAt" | "userId">) => void
  onCancel: () => void
  initialData?: Ticket
}

export function TicketForm({ onSubmit, onCancel, initialData }: TicketFormProps) {
  const [subject, setSubject] = useState(initialData?.subject || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [category, setCategory] = useState<Ticket["category"]>(initialData?.category || "General")
  const [priority, setPriority] = useState<Ticket["priority"]>(initialData?.priority || "Medium")
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
      status: initialData?.status || "Open",
    })

    if (!initialData) {
      setSubject("")
      setDescription("")
      setCategory("General")
      setPriority("Medium")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief subject of the ticket"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 ${
            errors.subject ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of the issue"
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Ticket["category"])}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
          >
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Ticket["priority"])}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          {initialData ? "Update Ticket" : "Create Ticket"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium py-2 px-4 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
