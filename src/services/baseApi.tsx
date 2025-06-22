import { API_BASE_URL } from '@env';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import Toast from 'react-native-toast-message';
import { errorMessage } from '../utils/helper';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: headers => {
    headers.set('Accept', 'application/json');
    return headers;
  },
});

/**
 * Wraps the baseQuery function with error handling. If a request fails and the server
 * returns an ErrorResponse, display a toast with the error message.
 *
 * @param args - The arguments to pass to the baseQuery function.
 * @returns The result of the baseQuery function.
 *
 *
 **/
const baseQueryWithErrorHandler = async (
  ...args: Parameters<typeof baseQuery>
) => {
  const result = await baseQuery(...args);
  if (result.error) {
    const message = errorMessage(result);
    Toast.show({
      type: 'error',
      text1: 'Global API Error',
      text2: message,
    });
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandler,
  tagTypes: [],
  endpoints: () => ({}),
});
