/**
 * API Client
 * Centralized fetch wrapper for all API calls
 */

import { API_CONFIG } from "./config";
import { ApiErrorHandler, ApiError } from "./errorHandler";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  data?: any;
}

export class ApiClient {
  static getToken(): string | null {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("ticket_app_user");
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          return parsedUser.token || null;
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  static buildUrl(url: string, params?: Record<string, string | number | boolean>): string {
    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const queryString = Object.entries(params)
      .filter(([, value]) => value !== null && value !== undefined && value !== "")
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    return queryString ? `${url}?${queryString}` : url;
  }

  static async request<T>(
    url: string,
    options: FetchOptions = {}
  ): Promise<{ success: true; data: T } | { success: false; error: ApiError }> {
    try {
      const { params, data, ...fetchOptions } = options;

      const finalUrl = this.buildUrl(url, params);
      const token = this.getToken();

      const headers: Record<string, string> = {
        ...API_CONFIG.headers,
        ...(fetchOptions.headers as Record<string, string>),
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      let body: string | FormData | undefined;

      if (data) {
        if (data instanceof FormData) {
          body = data;
          delete headers["Content-Type"];
        } else {
          body = JSON.stringify(data);
        }
      }

      const response = await fetch(finalUrl, {
        ...fetchOptions,
        headers,
        body,
      });

      if (!response.ok) {
        const error = await ApiErrorHandler.handleError(response);
        return { success: false, error };
      }

      const responseData = await response.json();
      return { success: true, data: responseData };
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : "Network error occurred",
        statusCode: 500,
      };
      return { success: false, error: apiError };
    }
  }

  static async get<T>(url: string, options: Omit<FetchOptions, "method"> = {}): Promise<{ success: true; data: T } | { success: false; error: ApiError }> {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  static async post<T>(url: string, data?: any, options: Omit<FetchOptions, "method"> = {}): Promise<{ success: true; data: T } | { success: false; error: ApiError }> {
    return this.request<T>(url, { ...options, method: "POST", data });
  }

  static async put<T>(url: string, data?: any, options: Omit<FetchOptions, "method"> = {}): Promise<{ success: true; data: T } | { success: false; error: ApiError }> {
    return this.request<T>(url, { ...options, method: "PUT", data });
  }

  static async patch<T>(url: string, data?: any, options: Omit<FetchOptions, "method"> = {}): Promise<{ success: true; data: T } | { success: false; error: ApiError }> {
    return this.request<T>(url, { ...options, method: "PATCH", data });
  }

  static async delete<T>(url: string, options: Omit<FetchOptions, "method"> = {}): Promise<{ success: true; data: T } | { success: false; error: ApiError }> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }
}
