import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';
import { ErrorResponse } from '../services/types';

export const errorMessage = (
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  let errorMessage = 'Unknown error occurred';

  // Check if this is a network error (no response from server)
  if (result !== null && result !== undefined) {
    if (result?.error?.status === 'FETCH_ERROR') {
      errorMessage = 'Network request failed.';
    } else if (
      result?.error?.data &&
      (result.error.data as ErrorResponse).status
    ) {
      // If API returned an error response with expected shape
      const errorData = result.error.data as ErrorResponse;
      errorMessage = errorData.status.error_message || errorMessage;
    } else if (typeof result.error === 'string') {
      // Sometimes error might just be a string message
      errorMessage = result.error;
    }
  }
  return errorMessage;
};
