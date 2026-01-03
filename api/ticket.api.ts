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
  status: "open" | "resolved" | "closed" | "in_progress" | "pending";
  priority: "high" | "low" | "medium" | "urgent";
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
  category?: string;
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
  data: Ticket | Ticket[] | {
    tickets: Ticket[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
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
    // Use FormData only if there are attachments
    if (payload.attachments && payload.attachments.length > 0) {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      if (payload.category) {
        formData.append("category", payload.category);
      }

      payload.attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      return ApiClient.post<TicketResponse>(
        API_ENDPOINTS.CREATE_TICKET,
        formData
      );
    } else {
      // Send as JSON if no attachments
      return ApiClient.post<TicketResponse>(
        API_ENDPOINTS.CREATE_TICKET,
        {
          title: payload.title,
          description: payload.description,
          category: payload.category,
        }
      );
    }
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
      API_ENDPOINTS.GET_ALL_TICKETS,
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
    // Use FormData only if there are attachments
    if (payload.attachments && payload.attachments.length > 0) {
      const formData = new FormData();
      if (payload.title) formData.append("title", payload.title);
      if (payload.description) formData.append("description", payload.description);
      if (payload.status) formData.append("status", payload.status);
      if (payload.priority) formData.append("priority", payload.priority);
      if (payload.category) formData.append("category", payload.category);
      if (payload.assignedTo) formData.append("assignedTo", payload.assignedTo);

      payload.attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      return ApiClient.put<TicketResponse>(
        API_ENDPOINTS.UPDATE_TICKET(id),
        formData
      );
    } else {
      // Send as JSON if no attachments
      return ApiClient.put<TicketResponse>(
        API_ENDPOINTS.UPDATE_TICKET(id),
        {
          title: payload.title,
          description: payload.description,
          status: payload.status,
          priority: payload.priority,
          category: payload.category,
          assignedTo: payload.assignedTo,
        }
      );
    }
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
