"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/common/ProtectedRoute"
import { Header } from "@/components/common/Header"
import { ticketApi } from "@/api"
import type { Ticket } from "@/types"
import { authApi } from "@/api"

export default function MyDashboardPage() {
  return (
    <ProtectedRoute>
      <MyDashboardContent />
    </ProtectedRoute>
  )
}

function MyDashboardContent() {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const loadAssigned = async () => {
      try {
        const user = authApi.getStoredUser()
        // load tickets and find assigned to current user
        const result = await ticketApi.getTickets({ page: 1, limit: 50 })
        if (result.success) {
          const backendBody: any = result.data
          const payload = backendBody && typeof backendBody === "object" ? (backendBody.data ?? backendBody) : backendBody

          let tickets: Ticket[] = []
          if (payload && typeof payload === "object" && Array.isArray(payload.tickets)) {
            tickets = payload.tickets
          } else if (Array.isArray(payload)) {
            tickets = payload as Ticket[]
          } else if (payload) {
            tickets = [payload as Ticket]
          }

          if (user) {
            const assigned = tickets.find(t => t.assignedTo === user._id || t.assignedTo === user.email)
            if (assigned) setTicket(assigned)
          }
        } else {
          setError("Failed to load tickets")
        }
      } catch (err) {
        setError("An error occurred while loading your assigned ticket")
      } finally {
        setLoading(false)
      }
    }

    loadAssigned()
  }, [])

  const markDone = async () => {
    if (!ticket) return
    setUpdating(true)
    try {
      const result = await ticketApi.updateTicket(ticket._id, { status: "resolved" })
      if (result.success) {
        const updated = Array.isArray(result.data.data) ? result.data.data[0] : result.data.data
        setTicket(updated as Ticket)
      } else {
        setError(result.error?.message || "Failed to update ticket status")
      }
    } catch (err) {
      setError("An error occurred while updating ticket status")
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header userEmail={(authApi.getStoredUser()?.email) || ""} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
            <button onClick={() => setError("")} className="float-right">✕</button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading your assigned ticket...</p>
          </div>
        ) : (
          <>
            {!ticket ? (
              <div className="text-center py-20 glass rounded-2xl shadow-xl">
                <p className="text-gray-600 text-xl font-medium mb-4">You have no assigned tickets right now</p>
              </div>
            ) : (
              <div className="glass rounded-2xl shadow-xl p-6 border border-green-100">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-2xl text-gray-900 mb-2">{ticket.title}</h3>
                    <p className="text-sm text-gray-600 font-medium mb-4">{ticket.category}</p>
                    <p className="text-gray-700 mb-6">{ticket.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">{ticket.priority} Priority</span>
                      <span className="text-sm text-gray-500">Status: <strong className="ml-1">{ticket.status}</strong></span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={markDone}
                      disabled={updating || ticket.status === "resolved" || ticket.status === "closed"}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-5 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {ticket.status === "resolved" ? "Done" : updating ? "Updating..." : "Mark Done"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
