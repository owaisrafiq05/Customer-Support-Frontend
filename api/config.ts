/**
 * API Configuration
 * Central configuration for all API calls
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const API_VERSION = "v1";
export const API_ENDPOINT = `${API_BASE_URL}/api/${API_VERSION}`;

export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: `${API_ENDPOINT}/auth/register`,
  AUTH_LOGIN: `${API_ENDPOINT}/auth/login`,
  AUTH_LOGOUT: `${API_ENDPOINT}/auth/logout`,
  AUTH_CURRENT_USER: `${API_ENDPOINT}/auth/current-user`,

  // Users
  GET_USERS: `${API_ENDPOINT}/users`,

  // Data Entries
  DATA_ENTRIES: `${API_ENDPOINT}/data-entries`,
  GET_DATA_ENTRY: (id: string) => `${API_ENDPOINT}/data-entries/${id}`,
  UPDATE_DATA_ENTRY: (id: string) => `${API_ENDPOINT}/data-entries/${id}`,
  DELETE_DATA_ENTRY: (id: string) => `${API_ENDPOINT}/data-entries/${id}`,

  // Tickets
  CREATE_TICKET: `${API_ENDPOINT}/tickets`,
  TICKETS: `${API_ENDPOINT}/tickets`,
  GET_ALL_TICKETS: `${API_ENDPOINT}/tickets/my-tickets`,
  GET_TICKET: (id: string) => `${API_ENDPOINT}/tickets/${id}`,
  UPDATE_TICKET: (id: string) => `${API_ENDPOINT}/tickets/${id}`,
  DELETE_TICKET: (id: string) => `${API_ENDPOINT}/tickets/${id}`,
  TICKET_STATS: `${API_ENDPOINT}/tickets/stats`,
  TICKET_MESSAGES: (ticketId: string) => `${API_ENDPOINT}/tickets/${ticketId}/messages`,
  ADD_TICKET_MESSAGE: (ticketId: string) => `${API_ENDPOINT}/tickets/${ticketId}/messages`,
};

export const API_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
};
