import React from 'react';
import styled from 'styled-components/native';
import { useTheme } from '../theme/ThemeProvider';

interface SearchProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}

/**
 * A search bar component with a placeholder and a callback for when the text changes.
 *
 * @prop {String} placeholder - The placeholder text to display.
 * @prop {Function} onChangeText - A callback for when the text changes.
 *
 * @example
 * <SearchBar placeholder="Search" onChangeText={(text) => console.log(text)} />
 */
const SearchBar = ({ placeholder, onChangeText }: SearchProps) => {
  const { theme } = useTheme();
  return (
    <Container>
      <Input
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default SearchBar;

const Container = styled.View`
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Input = styled.TextInput`
  height: 44px;
  border-radius: 8px;
  padding: 0 12px;
  border: 1px solid #ccc;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.base}px;
`;
