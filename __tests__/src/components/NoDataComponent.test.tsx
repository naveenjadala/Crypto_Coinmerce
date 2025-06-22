import { screen } from '@testing-library/react-native';
import NoDataComponent from '../../../src/components/NoDataComponent';
import { customRender } from '../../../src/utils/test-utils';

describe('NoDataComponent', () => {
  customRender(<NoDataComponent />);

  it('should render correctly', () => {
    expect(screen.getByText('No data available')).toBeTruthy();
  });
});
