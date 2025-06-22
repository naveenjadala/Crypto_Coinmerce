import { fireEvent, screen } from '@testing-library/react-native';
import { Text, TouchableOpacity } from 'react-native';
import CustomFlatList from '../../../src/components/CustomFlatList';
import { Crypto } from '../../../src/types';
import { customRender } from '../../../src/utils/test-utils';

const item = {
  id: 'test-id',
  name: 'bitcoin',
  symbol: 'btc',
  current_price: '10.99',
  market_cap: 1000000,
  price_change_percentage_24h: 5,
};

const mockOnPress = jest.fn();

const renderItem = ({ item }: { item: Crypto }) => (
  <TouchableOpacity onPress={() => mockOnPress(item.id)}>
    <Text>{item.name}</Text>
  </TouchableOpacity>
);

const keyExtractor = (item: Crypto) => item.id;

describe('CustomFlatList', () => {
  beforeEach(() => {
    customRender(
      <CustomFlatList
        data={[item]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={true}
      />,
    );
  });

  it('should render correctly', () => {
    expect(screen.getByText('bitcoin')).toBeTruthy();
  });

  it('should call onPress when item is pressed', () => {
    fireEvent.press(screen.getByText('bitcoin'));
    expect(mockOnPress).toHaveBeenCalledWith('test-id');
  });

  it('should render no data component', () => {
    customRender(
      <CustomFlatList
        data={[]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />,
    );
    expect(screen.getByText('No data available')).toBeTruthy();
  });

  it('should show refresh indicator if refreshing is true', () => {
    const flatList = screen.getByTestId('flat-list');
    expect(flatList.props.refreshing).toBe(true);
  });
});
