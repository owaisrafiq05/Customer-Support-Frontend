const USER_STORAGE_KEY = "ticket_app_user"
const TICKETS_STORAGE_KEY = "ticket_app_tickets"

export const authStorage = {
  setUser: (user: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    }
  },
  getUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem(USER_STORAGE_KEY)
      return user ? JSON.parse(user) : null
    }
    return null
  },
  clearUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_STORAGE_KEY)
    }
  },
}

export const ticketsStorage = {
  getTickets: () => {
    if (typeof window !== "undefined") {
      const tickets = localStorage.getItem(TICKETS_STORAGE_KEY)
      return tickets ? JSON.parse(tickets) : []
    }
    return []
  },
  setTickets: (tickets: any[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets))
    }
  },
}
