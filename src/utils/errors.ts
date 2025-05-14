import { AxiosError } from 'axios';

interface AirtableErrorResponse {
  error: {
    type: string;
    message: string;
  };
}

export function isAirtableError(
  error: any,
  targetStatus: number,
  targetErrorType: string,
): boolean {
  if (
    error &&
    typeof error === 'object' &&
    (error as AxiosError).isAxiosError
  ) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === targetStatus) {
      const errorData = axiosError.response.data as AirtableErrorResponse;
      if (errorData?.error?.type === targetErrorType) {
        return true;
      }
    }
  }
  return false;
}

export function isInvalidPermissionsError(error: any): boolean {
  return isAirtableError(error, 403, 'INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND');
}
