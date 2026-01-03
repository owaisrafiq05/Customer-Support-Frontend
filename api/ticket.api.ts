/**
 * Ticket API Integration
 * All ticket-related API calls
 */

import { ApiClient } from "./client";
import { API_ENDPOINTS } from "./config";

export interface TicketMessage {
  _id: string;
  content: string;
  createdBy: string;
  attachments?: string[];
  createdAt: string;
}

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  createdBy: string;
  assignedTo?: string;
  attachments?: string[];
  messages?: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketPayload {
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  attachments?: File[];
}

export interface UpdateTicketPayload {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  category?: string;
  assignedTo?: string;
  attachments?: File[];
}

export interface AddMessagePayload {
  message: string;
  attachments?: File[];
}

export interface TicketResponse {
  success: boolean;
  message: string;
  data: Ticket | Ticket[];
}

export interface TicketStatsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
  };
}

export interface MessageResponse {
  success: boolean;
  message: string;
  data: TicketMessage | TicketMessage[];
}

export const ticketApi = {
  /**
   * Get ticket statistics
   */
  async getTicketStats() {
    return ApiClient.get<TicketStatsResponse>(
      API_ENDPOINTS.TICKET_STATS
    );
  },

  /**
   * Create a new ticket with optional attachments
   */
  async createTicket(payload: CreateTicketPayload) {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("priority", payload.priority);
    formData.append("category", payload.category);

    if (payload.attachments && payload.attachments.length > 0) {
      payload.attachments.forEach((file) => {
        formData.append("attachments", file);
      });
    }

    return ApiClient.post<TicketResponse>(
      API_ENDPOINTS.TICKETS,
      formData
    );
  },

  /**
   * Get all tickets
   */
  async getTickets(params?: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    category?: string;
  }) {
    return ApiClient.get<TicketResponse>(
      API_ENDPOINTS.TICKETS,
      { params }
    );
  },

  /**
   * Get single ticket by ID
   */
  async getTicket(id: string) {
    return ApiClient.get<TicketResponse>(
      API_ENDPOINTS.GET_TICKET(id)
    );
  },

  /**
   * Update ticket
   */
  async updateTicket(id: string, payload: UpdateTicketPayload) {
    const formData = new FormData();
    if (payload.title) formData.append("title", payload.title);
    if (payload.description) formData.append("description", payload.description);
    if (payload.status) formData.append("status", payload.status);
    if (payload.priority) formData.append("priority", payload.priority);
    if (payload.category) formData.append("category", payload.category);
    if (payload.assignedTo) formData.append("assignedTo", payload.assignedTo);

    if (payload.attachments && payload.attachments.length > 0) {
      payload.attachments.forEach((file) => {
        formData.append("attachments", file);
      });
    }

    return ApiClient.put<TicketResponse>(
      API_ENDPOINTS.UPDATE_TICKET(id),
      formData
    );
  },

  /**
   * Delete ticket
   */
  async deleteTicket(id: string) {
    return ApiClient.delete<TicketResponse>(
      API_ENDPOINTS.DELETE_TICKET(id)
    );
  },

  /**
   * Add message to ticket
   */
  async addTicketMessage(ticketId: string, payload: AddMessagePayload) {
    const formData = new FormData();
    formData.append("message", payload.message);

    if (payload.attachments && payload.attachments.length > 0) {
      payload.attachments.forEach((file) => {
        formData.append("attachments", file);
      });
    }

    return ApiClient.post<MessageResponse>(
      API_ENDPOINTS.ADD_TICKET_MESSAGE(ticketId),
      formData
    );
  },

  /**
   * Get all messages for a ticket
   */
  async getTicketMessages(ticketId: string, params?: { page?: number; limit?: number }) {
    return ApiClient.get<MessageResponse>(
      API_ENDPOINTS.TICKET_MESSAGES(ticketId),
      { params }
    );
  },
};
