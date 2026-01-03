"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/common/ProtectedRoute"
import { Header } from "@/components/common/Header"
import { TicketList } from "@/components/tickets/TicketList"
import { TicketCreate } from "@/components/tickets/TicketCreate"
import { TicketEdit } from "@/components/tickets/TicketEdit"
import type { Ticket } from "@/types"
import { auth } from "@/lib/auth"
import { ticketsStorage } from "@/lib/storage"

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
    setCurrentPage("list")
  }

  const handleUpdateTicket = (ticketData: Omit<Ticket, "id" | "createdAt" | "userId">) => {
    if (!editingTicket) return

    const allTickets = ticketsStorage.getTickets()
    const updated = allTickets.map((t) => (t.id === editingTicket.id ? { ...editingTicket, ...ticketData } : t))
    ticketsStorage.setTickets(updated)

    setTickets(tickets.map((t) => (t.id === editingTicket.id ? { ...editingTicket, ...ticketData } : t)))

    setEditingTicket(null)
    setCurrentPage("list")
  }

  const handleDeleteTicket = (ticket: Ticket) => {
    const allTickets = ticketsStorage.getTickets()
    const updated = allTickets.filter((t) => t.id !== ticket.id)
    ticketsStorage.setTickets(updated)

    setTickets(tickets.filter((t) => t.id !== ticket.id))
  }

  const handleEditTicket = (ticket: Ticket) => {
    setEditingTicket(ticket)
    setCurrentPage("edit")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header userEmail={userEmail} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </main>
    </div>
  )
}
