"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/common/ProtectedRoute"
import { Header } from "@/components/common/Header"
import { TicketForm } from "@/components/tickets/TicketForm"
import { TicketTable } from "@/components/tickets/TicketTable"
import type { Ticket } from "@/types"
import { auth } from "@/lib/auth"
import { ticketsStorage } from "@/lib/storage"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<Ticket | null>(null)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const user = auth.getCurrentUser()
    if (user) {
      setUserEmail(user.email)
      // Load hardcoded data
      const hardcodedTickets: Ticket[] = [
        {
          id: "1",
          userId: user.id,
          subject: "Login issue",
          description: "Cannot login to account",
          category: "Technical",
          status: "Open",
          priority: "High",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          userId: user.id,
          subject: "Feature request",
          description: "Need dark mode support",
          category: "General",
          status: "In Progress",
          priority: "Medium",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          userId: user.id,
          subject: "Bug in dashboard",
          description: "Charts not loading properly",
          category: "Technical",
          status: "Resolved",
          priority: "Low",
          createdAt: new Date().toISOString(),
        },
      ]
      setTickets(hardcodedTickets)
      ticketsStorage.setTickets(hardcodedTickets)
    }
  }, [])

  const handleCreateTicket = (ticketData: Omit<Ticket, "id" | "createdAt" | "userId">) => {
    const user = auth.getCurrentUser()
    if (!user) return

    const newTicket: Ticket = {
      ...ticketData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      userId: user.id,
    }

    const allTickets = ticketsStorage.getTickets()
    const updated = [...allTickets, newTicket]
    ticketsStorage.setTickets(updated)

    setTickets([...tickets, newTicket])
    setShowForm(false)
  }

  const handleUpdateTicket = (ticketData: Omit<Ticket, "id" | "createdAt" | "userId">) => {
    if (!editingTicket) return

    const allTickets = ticketsStorage.getTickets()
    const updated = allTickets.map((t) => (t.id === editingTicket.id ? { ...editingTicket, ...ticketData } : t))
    ticketsStorage.setTickets(updated)

    setTickets(tickets.map((t) => (t.id === editingTicket.id ? { ...editingTicket, ...ticketData } : t)))

    setEditingTicket(null)
    setShowForm(false)
  }

  const handleDeleteTicket = (ticket: Ticket) => {
    const allTickets = ticketsStorage.getTickets()
    const updated = allTickets.filter((t) => t.id !== ticket.id)
    ticketsStorage.setTickets(updated)

    setTickets(tickets.filter((t) => t.id !== ticket.id))
    setDeleteConfirm(null)
  }

  const handleStatusChange = (ticketId: string, status: Ticket["status"]) => {
    const updatedTicket = tickets.find((t) => t.id === ticketId)
    if (!updatedTicket) return

    const updated = { ...updatedTicket, status }
    const allTickets = ticketsStorage.getTickets()
    const storageUpdated = allTickets.map((t) => (t.id === ticketId ? updated : t))
    ticketsStorage.setTickets(storageUpdated)

    setTickets(tickets.map((t) => (t.id === ticketId ? updated : t)))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header userEmail={userEmail} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showForm && !editingTicket ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Tickets</h2>
                <p className="text-gray-600 mt-1">Manage and track your support tickets</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                New Ticket
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <TicketTable
                tickets={tickets}
                onEdit={(ticket) => {
                  setEditingTicket(ticket)
                  setShowForm(true)
                }}
                onDelete={setDeleteConfirm}
                onStatusChange={handleStatusChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {editingTicket ? "Edit Ticket" : "Create New Ticket"}
              </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl">
              <TicketForm
                initialData={editingTicket || undefined}
                onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
                onCancel={() => {
                  setShowForm(false)
                  setEditingTicket(null)
                }}
              />
            </div>
          </>
        )}
      </main>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Ticket?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the ticket "{deleteConfirm.subject}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteTicket(deleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium py-2 px-4 rounded-lg transition"
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
