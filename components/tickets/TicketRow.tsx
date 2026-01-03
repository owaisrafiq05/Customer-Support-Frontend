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
    Low: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  }

  const statusColor = {
    Open: "bg-gray-100 text-gray-800",
    "In Progress": "bg-green-100 text-green-800",
    Resolved: "bg-emerald-100 text-emerald-800",
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
      <td className="py-4 px-4 font-medium text-gray-900 truncate max-w-xs">{ticket.subject}</td>
      <td className="py-4 px-4">
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${priorityColor[ticket.priority]}`}>
          {ticket.priority}
        </span>
      </td>
      <td className="py-4 px-4 text-gray-700 text-sm">{ticket.category}</td>
      <td className="py-4 px-4">
        <select
          value={ticket.status}
          onChange={(e) => onStatusChange(ticket.id, e.target.value as Ticket["status"])}
          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${statusColor[ticket.status]}`}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
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
