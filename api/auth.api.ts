/**
 * Auth API Integration
 * All authentication-related API calls
 */

import { ApiClient } from "./client";
import { API_ENDPOINTS } from "./config";

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export const authApi = {
  /**
   * Register a new user
   */
  async register(payload: RegisterPayload) {
    return ApiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH_REGISTER,
      payload
    );
  },

  /**
   * Login user
   */
  async login(payload: LoginPayload) {
    return ApiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH_LOGIN,
      payload
    );
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    return ApiClient.get<{ success: boolean; data: User }>(
      API_ENDPOINTS.AUTH_CURRENT_USER
    );
  },

  /**
   * Logout user
   */
  async logout() {
    return ApiClient.post<{ success: boolean; message: string }>(
      API_ENDPOINTS.AUTH_LOGOUT
    );
  },

  /**
   * Store user data in local storage
   */
  storeUser(user: User, token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "ticket_app_user",
        JSON.stringify({ ...user, token })
      );
    }
  },

  /**
   * Clear user data from local storage
   */
  clearUser() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ticket_app_user");
    }
  },

  /**
   * Get stored user data
   */
  getStoredUser(): (User & { token?: string }) | null {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("ticket_app_user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("ticket_app_user");
      return user !== null;
    }
    return false;
  },
};
