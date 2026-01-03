"use client"

import { useState } from "react"
import { 
  MagnifyingGlassIcon, 
  XMarkIcon, 
  ChartBarIcon, 
  DocumentIcon, 
  PlusIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/outline"
import { 
  ExclamationCircleIcon as ExclamationCircleIconSolid,
  ClockIcon,
  CheckCircleIcon
} from "@heroicons/react/24/solid"
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
  const [priorityFilter, setPriorityFilter] = useState<"all" | Ticket["priority"]>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter tickets by status, priority, and search term
  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = filter === "all" || ticket.status === filter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
    const matchesSearch = searchTerm === "" || 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesPriority && matchesSearch
  })

  // Export functions
  const exportToCSV = () => {
    const headers = ["ID", "Subject", "Description", "Category", "Priority", "Status", "Created Date"]
    const csvContent = [
      headers.join(","),
      ...filteredTickets.map(ticket => [
        ticket.id,
        `"${ticket.subject.replace(/"/g, '""')}"`,
        `"${ticket.description.replace(/"/g, '""')}"`,
        ticket.category,
        ticket.priority,
        ticket.status,
        new Date(ticket.createdAt).toLocaleDateString()
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `tickets-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToPDF = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Support Tickets Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px; }
            .ticket { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 8px; }
            .ticket-header { font-weight: bold; font-size: 16px; margin-bottom: 8px; }
            .ticket-meta { color: #666; font-size: 12px; margin: 5px 0; }
            .priority-high { background-color: #fee2e2; }
            .priority-medium { background-color: #fef3c7; }
            .priority-low { background-color: #dbeafe; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <h1>Support Tickets Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <p>Total Tickets: ${filteredTickets.length}</p>
          ${filteredTickets.map(ticket => `
            <div class="ticket priority-${ticket.priority.toLowerCase()}">
              <div class="ticket-header">${ticket.subject}</div>
              <div class="ticket-meta">
                ID: ${ticket.id} | Category: ${ticket.category} | Priority: ${ticket.priority} | Status: ${ticket.status}
              </div>
              <div class="ticket-meta">Created: ${new Date(ticket.createdAt).toLocaleDateString()}</div>
              <p>${ticket.description}</p>
            </div>
          `).join("")}
        </body>
      </html>
    `

    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

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
        return <ExclamationCircleIconSolid className="w-6 h-6 text-red-500" />
      case "In Progress":
        return <ClockIcon className="w-6 h-6 text-yellow-500" />
      case "Resolved":
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />
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
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold gradient-text">Support Tickets</h1>
          <p className="text-gray-600 text-lg font-medium">Manage and track all your support tickets efficiently</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Enhanced Export Buttons */}
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg text-sm flex items-center gap-2 hover:shadow-xl"
            >
              <ChartBarIcon className="w-5 h-5" />
              Export CSV
            </button>
            <button
              onClick={exportToPDF}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg text-sm flex items-center gap-2 hover:shadow-xl"
            >
              <DocumentIcon className="w-5 h-5" />
              Export PDF
            </button>
          </div>
          <button
            onClick={onCreateClick}
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center gap-3 justify-center hover:shadow-2xl"
          >
            <PlusIcon className="w-6 h-6" />
            Create New Ticket
          </button>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="glass rounded-2xl p-8 shadow-xl border border-green-100">
        {/* Enhanced Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search tickets by subject, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 pl-14 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all bg-white/80 text-gray-900 font-medium shadow-sm hover:shadow-md"
          />
          <MagnifyingGlassIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Enhanced Filter Tabs */}
        <div className="flex flex-wrap gap-6 mb-6">
          {/* Status Filter */}
          <div className="flex flex-wrap gap-3">
            <span className="text-sm font-bold text-gray-800 self-center">Status:</span>
            {(["all", "Open", "In Progress", "Resolved"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all text-sm shadow-sm hover:shadow-md ${
                  filter === status
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {status === "all" ? "All" : status}
                {status !== "all" && (
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {tickets.filter((t) => t.status === status).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Priority Filter */}
          <div className="flex flex-wrap gap-3">
            <span className="text-sm font-bold text-gray-800 self-center">Priority:</span>
            {(["all", "High", "Medium", "Low"] as const).map((priority) => (
              <button
                key={priority}
                onClick={() => setPriorityFilter(priority)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all text-sm shadow-sm hover:shadow-md ${
                  priorityFilter === priority
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {priority === "all" ? "All" : priority}
                {priority !== "all" && (
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {tickets.filter((t) => t.priority === priority).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Results Summary */}
        <div className="text-sm text-gray-600 border-t border-gray-200 pt-4 font-medium">
          Showing <span className="font-bold text-green-600">{filteredTickets.length}</span> of <span className="font-bold">{tickets.length}</span> tickets
          {searchTerm && <span className="text-green-600"> matching "{searchTerm}"</span>}
        </div>
      </div>

      {/* Enhanced Tickets Grid */}
      {filteredTickets.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl shadow-xl">
          <ClipboardDocumentListIcon className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          {searchTerm || filter !== "all" || priorityFilter !== "all" ? (
            <>
              <p className="text-gray-600 text-xl font-medium mb-4">No tickets match your filters</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setFilter("all")
                  setPriorityFilter("all")
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                Clear all filters
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-600 text-xl font-medium mb-4">No tickets found</p>
              <button
                onClick={onCreateClick}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                Create your first ticket
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTickets.map((ticket, index) => (
            <div
              key={ticket.id}
              className="glass rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-green-100 animate-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Enhanced Card Header */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-green-100">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-xl line-clamp-2 mb-2">{ticket.subject}</h3>
                    <p className="text-sm text-gray-600 font-medium">{ticket.category}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusIcon(ticket.status)}
                  </div>
                </div>
              </div>

              {/* Enhanced Card Body */}
              <div className="p-6 space-y-6">
                <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">{ticket.description}</p>

                {/* Enhanced Priority Badge */}
                <div className="flex justify-between items-center">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-sm ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority} Priority
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {formatDate(ticket.createdAt)}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Status:</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    ticket.status === "Open" ? "bg-red-100 text-red-800" :
                    ticket.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              </div>

              {/* Enhanced Card Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => onEdit(ticket)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(ticket)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="glass rounded-2xl p-8 max-w-md w-full shadow-2xl border border-red-200 animate-in zoom-in-95 duration-300">
            <div className="text-center mb-6">
              <ExclamationTriangleIcon className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Ticket?</h3>
            </div>
            <p className="text-gray-600 mb-8 text-center leading-relaxed">
              Are you sure you want to delete the ticket <span className="font-bold text-gray-900">"{deleteConfirm.subject}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  onDelete(deleteConfirm)
                  setDeleteConfirm(null)
                }}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all hover:shadow-lg"
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
