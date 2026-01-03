"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/common/ProtectedRoute"
import { Header } from "@/components/common/Header"
import { TicketList } from "@/components/tickets/TicketList"
import { TicketCreate } from "@/components/tickets/TicketCreate"
import { TicketEdit } from "@/components/tickets/TicketEdit"
import type { Ticket } from "@/types"
import { authApi, ticketApi } from "@/api"

type Page = "list" | "create" | "edit"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const [currentPage, setCurrentPage] = useState<Page>("list")
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadUserAndTickets = async () => {
      try {
        const user = authApi.getStoredUser()
        if (user) {
          setUserEmail(user.email)
        }

        // Load tickets from API
        const result = await ticketApi.getTickets({ page: 1, limit: 50 })
        if (result.success) {
          // ApiClient returns { success: true, data: <backend response body> }
          // Backend ticket endpoints return { success, message, data }
          // so the actual payload is in result.data.data (or result.data.data.tickets)
          let ticketsData: Ticket[] = []

          const backendBody: any = result.data
          const payload = backendBody && typeof backendBody === "object" ? (backendBody.data ?? backendBody) : backendBody

          if (payload && typeof payload === "object" && Array.isArray(payload.tickets)) {
            ticketsData = payload.tickets
          } else if (Array.isArray(payload)) {
            ticketsData = payload as Ticket[]
          } else if (payload) {
            ticketsData = [payload as Ticket]
          }

          setTickets(ticketsData)
        } else {
          setError("Failed to load tickets")
        }
      } catch (err) {
        setError("An error occurred while loading tickets")
      } finally {
        setLoading(false)
      }
    }

    loadUserAndTickets()
  }, [])

  const handleCreateTicket = async (ticketData: any) => {
    try {
      const result = await ticketApi.createTicket({
        title: ticketData.title,
        description: ticketData.description,
        category: ticketData.category,
      })

      if (result.success) {
        const newTicket = Array.isArray(result.data.data)
          ? result.data.data[0]
          : result.data.data
        setTickets([...tickets, newTicket as any])
        setCurrentPage("list")
      } else {
        setError(result.error.message || "Failed to create ticket")
      }
    } catch (err) {
      setError("An error occurred while creating ticket")
    }
  }

  const handleUpdateTicket = async (ticketData: any) => {
    if (!editingTicket) return

    try {
      const result = await ticketApi.updateTicket(editingTicket._id, {
        title: ticketData.title,
        description: ticketData.description,
        status: ticketData.status,
        priority: ticketData.priority,
        category: ticketData.category,
      })

      if (result.success) {
        const updated = Array.isArray(result.data.data)
          ? result.data.data[0]
          : result.data.data
        setTickets(tickets.map((t) => (t._id === editingTicket._id ? (updated as any) : t)))
        setEditingTicket(null)
        setCurrentPage("list")
      } else {
        setError(result.error.message || "Failed to update ticket")
      }
    } catch (err) {
      setError("An error occurred while updating ticket")
    }
  }
  const handleDeleteTicket = async (ticket: Ticket) => {
    try {
      const result = await ticketApi.deleteTicket(ticket._id)
      if (result.success) {
        setTickets(tickets.filter((t) => t._id !== ticket._id))
      } else {
        setError(result.error.message || "Failed to delete ticket")
      }
    } catch (err) {
      setError("An error occurred while deleting ticket")
    }
  }

  const handleEditTicket = (ticket: Ticket) => {
    setEditingTicket(ticket)
    setCurrentPage("edit")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header userEmail={userEmail} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
            <button onClick={() => setError("")} className="float-right">✕</button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading tickets...</p>
          </div>
        ) : (
          <>
            {currentPage === "list" && (
              <TicketList
                tickets={tickets}
                onCreateClick={() => setCurrentPage("create")}
                onEdit={handleEditTicket}
                onDelete={handleDeleteTicket}
              />
            )}

            {currentPage === "create" && (
              <TicketCreate
                onSubmit={handleCreateTicket}
                onCancel={() => setCurrentPage("list")}
              />
            )}

            {currentPage === "edit" && editingTicket && (
              <TicketEdit
                ticket={editingTicket}
                onSubmit={handleUpdateTicket}
                onCancel={() => {
                  setCurrentPage("list")
                  setEditingTicket(null)
                }}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}
