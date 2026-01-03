/**
 * API Error Handler
 * Centralized error handling for all API calls
 */

export interface ApiError {
  message: string;
  statusCode: number;
  data?: any;
}

export class ApiErrorHandler {
  static async handleError(response: Response): Promise<ApiError> {
    let errorData;

    try {
      errorData = await response.json();
    } catch {
      errorData = { message: "Unknown error occurred" };
    }

    const error: ApiError = {
      message: errorData.message || "Something went wrong",
      statusCode: response.status,
      data: errorData,
    };

    return error;
  }

  static isUnauthorized(error: ApiError): boolean {
    return error.statusCode === 401 || error.statusCode === 403;
  }

  static isNotFound(error: ApiError): boolean {
    return error.statusCode === 404;
  }

  static isValidationError(error: ApiError): boolean {
    return error.statusCode === 400;
  }

  static formatErrorMessage(error: ApiError): string {
    if (error.data?.errors) {
      return Object.values(error.data.errors).join(", ");
    }
    return error.message;
  }
}
