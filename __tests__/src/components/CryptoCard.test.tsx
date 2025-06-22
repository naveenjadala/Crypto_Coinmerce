import { fireEvent, screen } from '@testing-library/react-native';
import CryptoCard from '../../../src/components/CryptoCard';
import { customRender } from '../../../src/utils/test-utils';

const item = {
  id: 'test-id',
  name: 'bitcoin',
  symbol: 'btc',
  current_price: '10.99',
  market_cap: 1000000,
  price_change_percentage_24h: 5,
};

describe('CryptoCard', () => {
  const onChangeText = jest.fn();

  beforeEach(() => {
    onChangeText.mockClear();
    customRender(<CryptoCard item={item} onPress={onChangeText} />);
  });

  it('should render correctly', () => {
    expect(screen.getByText('BTC')).toBeTruthy();
    expect(screen.getByText('bitcoin')).toBeTruthy();
    expect(screen.getByText('$ 10.99')).toBeTruthy();
    expect(screen.getByText('5.00%')).toBeTruthy();
  });

  it('should call onPress', () => {
    fireEvent.press(screen.getByTestId('crypto-card'));
    expect(onChangeText).toHaveBeenCalledWith(item);
  });
});
