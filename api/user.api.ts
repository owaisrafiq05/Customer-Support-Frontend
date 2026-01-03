/**
 * User API Integration
 * All user-related API calls
 */

import { ApiClient } from "./client";
import { API_ENDPOINTS } from "./config";
import { User } from "./auth.api";

export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

export const userApi = {
  /**
   * Get all users (admin only)
   */
  async getUsers(params?: { page?: number; limit?: number }) {
    return ApiClient.get<GetUsersResponse>(
      API_ENDPOINTS.GET_USERS,
      { params }
    );
  },
};
