"use client"

import type { Ticket } from "@/types"
import { TicketRow } from "./TicketRow"

interface TicketTableProps {
  tickets: Ticket[]
  onEdit: (ticket: Ticket) => void
  onDelete: (ticket: Ticket) => void
  onStatusChange: (ticketId: string, status: Ticket["status"]) => void
}

export function TicketTable({ tickets, onEdit, onDelete, onStatusChange }: TicketTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No tickets yet. Create one to get started.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-4 px-4 font-semibold text-gray-900">Subject</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900">Priority</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900">Category</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900">Created</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
