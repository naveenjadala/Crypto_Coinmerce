import { fireEvent, screen } from '@testing-library/react-native';
import SearchBar from '../../../src/components/SearchBar';
import { customRender } from '../../../src/utils/test-utils';

describe('SearchBar', () => {
  const onChangeText = jest.fn();

  beforeEach(() => {
    onChangeText.mockClear();
    customRender(
      <SearchBar onChangeText={onChangeText} placeholder="search" />,
    );
  });

  it('should renders placeholder', () => {
    expect(screen.getByPlaceholderText('search')).toBeTruthy();
  });

  it('should call onChangeText', () => {
    fireEvent.changeText(screen.getByPlaceholderText('search'), 'test');
    expect(onChangeText).toHaveBeenCalledWith('test');
  });
});
