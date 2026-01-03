import { authStorage } from "./storage"

export const auth = {
  signup: (email: string, password: string) => {
    const existingUser = auth.getUserByEmail(email)
    if (existingUser) {
      return { success: false, error: "Email already registered" }
    }

    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
    }

    authStorage.setUser(user)
    return { success: true, user: { id: user.id, email: user.email } }
  },

  login: (email: string, password: string) => {
    const user = auth.getUserByEmail(email)
    if (!user || user.password !== password) {
      return { success: false, error: "Invalid email or password" }
    }
    authStorage.setUser(user)
    return { success: true, user: { id: user.id, email: user.email } }
  },

  logout: () => {
    authStorage.clearUser()
  },

  getCurrentUser: () => {
    return authStorage.getUser()
  },

  getUserByEmail: (email: string) => {
    return authStorage.getUser()
  },
}
