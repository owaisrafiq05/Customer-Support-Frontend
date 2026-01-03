export interface User {
  _id: string
  email: string
  name: string
  role?: string
}

export interface Ticket {
  _id: string
  title: string
  description: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in_progress" | "pending" | "resolved" | "closed"
  createdAt: string
  createdBy: string
  ticketNumber?: string
  tags?: string[]
  attachments?: any[]
  assignedTo?: string
  aiSentiment?: string
  aiSuggestedPriority?: string
  aiSuggestedCategory?: string
  aiSummary?: string
}
