/**
 * Data Entry API Integration
 * All data entry-related API calls
 */

import { ApiClient } from "./client";
import { API_ENDPOINTS } from "./config";

export interface DataEntry {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDataEntryPayload {
  title: string;
  description: string;
  image?: File;
}

export interface UpdateDataEntryPayload {
  title?: string;
  description?: string;
  image?: File;
}

export interface DataEntryResponse {
  success: boolean;
  message: string;
  data: DataEntry | DataEntry[];
}

export const dataEntryApi = {
  /**
   * Create a new data entry with optional image
   */
  async createDataEntry(payload: CreateDataEntryPayload) {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    if (payload.image) {
      formData.append("image", payload.image);
    }

    return ApiClient.post<DataEntryResponse>(
      API_ENDPOINTS.DATA_ENTRIES,
      formData
    );
  },

  /**
   * Get all data entries
   */
  async getDataEntries(params?: { page?: number; limit?: number }) {
    return ApiClient.get<DataEntryResponse>(
      API_ENDPOINTS.DATA_ENTRIES,
      { params }
    );
  },

  /**
   * Get single data entry by ID
   */
  async getDataEntry(id: string) {
    return ApiClient.get<DataEntryResponse>(
      API_ENDPOINTS.GET_DATA_ENTRY(id)
    );
  },

  /**
   * Update data entry
   */
  async updateDataEntry(id: string, payload: UpdateDataEntryPayload) {
    const formData = new FormData();
    if (payload.title) formData.append("title", payload.title);
    if (payload.description) formData.append("description", payload.description);
    if (payload.image) formData.append("image", payload.image);

    return ApiClient.put<DataEntryResponse>(
      API_ENDPOINTS.UPDATE_DATA_ENTRY(id),
      formData
    );
  },

  /**
   * Delete data entry
   */
  async deleteDataEntry(id: string) {
    return ApiClient.delete<DataEntryResponse>(
      API_ENDPOINTS.DELETE_DATA_ENTRY(id)
    );
  },
};
