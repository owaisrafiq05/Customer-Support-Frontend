"use client"

import type { Ticket } from "@/types"

interface TicketRowProps {
  ticket: Ticket
  onEdit: (ticket: Ticket) => void
  onDelete: (ticket: Ticket) => void
  onStatusChange: (ticketId: string, status: Ticket["status"]) => void
}

export function TicketRow({ ticket, onEdit, onDelete, onStatusChange }: TicketRowProps) {
  const priorityColor = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
    urgent: "bg-red-200 text-red-900",
  }

  const statusColor = {
    open: "bg-gray-100 text-gray-800",
    in_progress: "bg-green-100 text-green-800",
    resolved: "bg-emerald-100 text-emerald-800",
    pending: "bg-yellow-100 text-yellow-800",
    closed: "bg-gray-300 text-gray-900",
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
      <td className="py-4 px-4 font-medium text-gray-900 truncate max-w-xs">{ticket.title}</td>
      <td className="py-4 px-4">
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${priorityColor[ticket.priority] || "bg-gray-100 text-gray-800"}`}>
          {ticket.priority}
        </span>
      </td>
      <td className="py-4 px-4 text-gray-700 text-sm">{ticket.category}</td>
      <td className="py-4 px-4">
        <select
          value={ticket.status}
          onChange={(e) => onStatusChange(ticket._id, e.target.value as Ticket["status"])}
          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${statusColor[ticket.status as keyof typeof statusColor] || "bg-gray-100 text-gray-800"}`}
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      </td>
      <td className="py-4 px-4 text-gray-600 text-sm">{formatDate(ticket.createdAt)}</td>
      <td className="py-4 px-4">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(ticket)}
            className="text-green-600 hover:text-green-700 font-medium text-sm transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(ticket)}
            className="text-red-600 hover:text-red-700 font-medium text-sm transition"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}
