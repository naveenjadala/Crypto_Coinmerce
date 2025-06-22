import { fireEvent, screen } from '@testing-library/react-native';
import { ErrorCard } from '../../../src/components/ErrorCard';
import { customRender } from '../../../src/utils/test-utils';

describe('ErrorCard', () => {
  const onRetry = jest.fn();
  beforeEach(() => {
    onRetry.mockClear;
    customRender(
      <ErrorCard error={{ message: 'Error message' }} onRetry={onRetry} />,
    );
  });

  it('should render error message', () => {
    expect(screen.getByText('Error message')).toBeTruthy();
  });

  it('should call onRetry', () => {
    fireEvent.press(screen.getByText('Try Again'));
    expect(onRetry).toHaveBeenCalled();
  });

  it('should not call onRetry if error is null', () => {
    customRender(<ErrorCard error={undefined} onRetry={onRetry} />);
    expect(screen.queryByText('Try Again')).toBeNull();
  });

  it('should render status status code and message', () => {
    customRender(
      <ErrorCard error={{ status: 500, message: 'Error message' }} />,
    );
    expect(screen.getByText('Error code: 500')).toBeTruthy();
    expect(screen.getByText(' Error: 500')).toBeTruthy();
  });

  it('should render serialized error message', () => {
    customRender(
      <ErrorCard
        error={{
          status: 500,
          data: { status: { error_code: 500, error_message: 'Error message' } },
        }}
        onRetry={onRetry}
      />,
    );
    expect(screen.getByText('Error code: 500')).toBeTruthy();
    expect(screen.getByText('Error message')).toBeTruthy();
    expect(screen.queryByText('Try Again')).toBeTruthy();
  });

  it('should render Unknown serialized error', () => {
    customRender(
      <ErrorCard
        error={{
          message: '',
        }}
        onRetry={onRetry}
      />,
    );
    expect(screen.getByText('Unknown serialized error')).toBeTruthy();
    expect(screen.queryByText('Try Again')).toBeTruthy();
  });
});
