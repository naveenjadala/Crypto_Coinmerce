import { screen } from '@testing-library/react-native';
import Header from '../../../src/components/Header';
import { customRender } from '../../../src/utils/test-utils';

describe('Header', () => {
  customRender(<Header title="test" />);
  it('should render correctly', () => {
    expect(screen.getByText('test')).toBeTruthy();
  });

  it('should render back button', () => {
    customRender(<Header title="test" isBackButton />);
    expect(screen.getByTestId('back-button')).toBeTruthy();
  });

  it('should render back button', () => {
    customRender(<Header title="test" isBackButton={false} />);
    expect(screen.queryByTestId('back-button')).toBeNull();
  });
});
