import { Button } from 'react-native';
import styled from 'styled-components/native';

import React from 'react';

interface ErrorStatus {
  error_message: string;
  error_code: number | string;
}

interface ApiError {
  status: ErrorStatus;
}

interface ErrorDisplayProps {
  error: any; // You can narrow this if you use a specific error shape (e.g., `SerializedError | FetchBaseQueryError`)
  onRetry?: () => void;
}

export const ErrorCard = ({ error, onRetry }: ErrorDisplayProps) => {
  if (!error) return null;

  let errorMessage = 'Something went wrong';
  let errorCode: number | string = 'Unknown';

  if (error.status === 'FETCH_ERROR') {
    errorMessage = error?.error || 'Network error';
    errorCode = 'FETCH_ERROR';
  } else if (typeof error.data === 'object' && error.data?.status) {
    const apiError = error.data as ApiError;
    errorMessage = apiError.status.error_message || errorMessage;
    errorCode = apiError.status.error_code || errorCode;
  } else if (typeof error.status === 'number') {
    errorMessage = `Server Error: ${error.status}`;
    errorCode = error.status;
  } else if (error.message) {
    errorMessage = error.message;
    errorCode = 'MESSAGE_ERROR';
  }

  return (
    <Container>
      <ErrorText>{errorMessage}</ErrorText>
      <ErrorCode>Error code: {errorCode}</ErrorCode>
      {onRetry && <Button title="Try Again" onPress={onRetry} />}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
`;

const ErrorCode = styled.Text`
  color: gray;
  margin-bottom: 20px;
`;
