export interface User {
  id: string
  email: string
}

export interface Ticket {
  id: string
  subject: string
  description: string
  category: "Technical" | "Billing" | "General"
  priority: "Low" | "Medium" | "High"
  status: "Open" | "In Progress" | "Resolved"
  createdAt: string
  userId: string
}
