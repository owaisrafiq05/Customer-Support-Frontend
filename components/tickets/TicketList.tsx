"use client"

import { useState } from "react"
import type { Ticket } from "@/types"

interface TicketListProps {
  tickets: Ticket[]
  onCreateClick: () => void
  onEdit: (ticket: Ticket) => void
  onDelete: (ticket: Ticket) => void
}

export function TicketList({ tickets, onCreateClick, onEdit, onDelete }: TicketListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<Ticket | null>(null)
  const [filter, setFilter] = useState<"all" | Ticket["status"]>("all")

  const filteredTickets = filter === "all" ? tickets : tickets.filter((t) => t.status === filter)

  const getPriorityColor = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-blue-100 text-blue-800"
    }
  }

  const getStatusIcon = (status: Ticket["status"]) => {
    switch (status) {
      case "Open":
        return "🔴"
      case "In Progress":
        return "🟡"
      case "Resolved":
        return "🟢"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600 mt-2">Manage and track all your support tickets</p>
        </div>
        <button
          onClick={onCreateClick}
          className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105 shadow-lg"
        >
          + Create New Ticket
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow-sm">
        {(["all", "Open", "In Progress", "Resolved"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === status
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status === "all" ? "All Tickets" : status}
            {status !== "all" && ` (${tickets.filter((t) => t.status === status).length})`}
          </button>
        ))}
      </div>

      {/* Tickets Grid */}
      {filteredTickets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-gray-600 text-lg">No tickets found</p>
          <button
            onClick={onCreateClick}
            className="mt-4 text-green-600 hover:text-green-700 font-semibold"
          >
            Create your first ticket
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg line-clamp-2">{ticket.subject}</h3>
                    <p className="text-sm text-gray-600 mt-1">{ticket.category}</p>
                  </div>
                  <span className="text-2xl">{getStatusIcon(ticket.status)}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-4">
                <p className="text-gray-700 text-sm line-clamp-3">{ticket.description}</p>

                {/* Priority Badge */}
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority} Priority
                  </span>
                </div>

                {/* Meta Info */}
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Created: {formatDate(ticket.createdAt)}</div>
                  <div>Status: {ticket.status}</div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex gap-2">
                <button
                  onClick={() => onEdit(ticket)}
                  className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-lg transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(ticket)}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-2 px-4 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">⚠️</div>
              <h3 className="text-lg font-bold text-gray-900">Delete Ticket?</h3>
            </div>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete the ticket <span className="font-semibold">"{deleteConfirm.subject}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  onDelete(deleteConfirm)
                  setDeleteConfirm(null)
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
