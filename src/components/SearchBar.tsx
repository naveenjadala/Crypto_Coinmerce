import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '../theme/ThemeProvider';

interface SearchProps extends TextInputProps {
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
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        onChangeText={onChangeText}
        style={{
          ...styles.inputStyle,
          borderColor: theme.colors.text,
          color: theme.colors.text,
        }}
      />
    </Container>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputStyle: {
    height: 44,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
});
const Container = styled.View`
  padding: 10px 16px;
`;
