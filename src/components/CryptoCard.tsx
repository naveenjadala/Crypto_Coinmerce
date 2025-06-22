import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Crypto } from '../types';

interface CardProps {
  item: Crypto;
  onPress: (item: Crypto) => void;
}

/*************  ✨ Windsurf Command 🌟  *************/
/**
 * A component that renders a crypto card with its name, symbol, current price,
 * and 24 hour price change.
 *
 * @param {CardProps} props Props for the component.
 * @param {Crypto} props.item The crypto information.
 * @param {(item: Crypto) => void} props.onPress The function to call when the card is pressed.
 */
const CryptoCard = React.memo(({ item, onPress }: CardProps) => {
  const handlePress = () => {
    onPress(item);
  };
  const isPositive = item.price_change_percentage_24h >= 0;

  return (
    <CardContainer onPress={handlePress} key={item.id} testID="crypto-card">
      <LeftSection>
        <ImageView source={{ uri: item.image }} />
        <View>
          <NameText>{item.name}</NameText>
          <SymbolText>{item.symbol.toUpperCase()}</SymbolText>
        </View>
      </LeftSection>
      <RightSection>
        <PriceText isPositive={isPositive}>$ {item.current_price}</PriceText>
        <Change>{item.price_change_percentage_24h.toFixed(2)}%</Change>
      </RightSection>
    </CardContainer>
  );
});

export default CryptoCard;

const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  padding: 10px;
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RightSection = styled.View`
  align-items: flex-end;
`;

const ImageView = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const NameText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.base}px;
  color: ${({ theme }) => theme.colors.text};
`;

const SymbolText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PriceText = styled.Text<{ isPositive: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.base}px;
  color: ${({ isPositive, theme }) =>
    isPositive ? theme.colors.profit : theme.colors.loss};
`;

const Change = styled.Text`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 4px 8px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.text};
`;
