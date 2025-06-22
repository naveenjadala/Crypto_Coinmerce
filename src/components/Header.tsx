import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { useTheme } from '../theme/ThemeProvider';

interface Props {
  backPressed?: () => void;
  title: string;
  isBackButton?: boolean;
  toggleTheme?: () => void;
  isThemeToggle?: boolean;
  mode?: boolean;
}

/**
 * A header component with a title and optional back button and theme toggle.
 *
 * @prop {Function} backPressed - A callback for when the back button is pressed.
 * @prop {String} title - The title of the header.
 * @prop {Boolean} isBackButton - Whether to show the back button. Defaults to false.
 * @prop {Function} toggleTheme - A callback for when the theme toggle is pressed.
 * @prop {Boolean} isThemeToggle - Whether to show the theme toggle. Defaults to false.
 *
 * @example
 * <Header title="My Screen" />
 * <Header title="My Screen" isBackButton />
 * <Header title="My Screen" isBackButton toggleTheme={toggleTheme} isThemeToggle />
 */
const Header = ({
  backPressed,
  title,
  isBackButton = false,
  toggleTheme,
  isThemeToggle = false,
  mode = false,
}: Props) => {
  const { theme } = useTheme();
  return (
    <Container>
      {isBackButton ? (
        <Left>
          <BackButton testID="back-button" onPress={backPressed}>
            <Icon name="chevron-back" size={24} color={theme.colors.text} />
          </BackButton>
        </Left>
      ) : (
        <Left />
      )}
      <Center>
        <Title>{title}</Title>
      </Center>
      {isThemeToggle ? (
        <Right>
          {mode ? (
            <Icon
              name="moon"
              size={24}
              color={theme.colors.text}
              onPress={toggleTheme}
            />
          ) : (
            <Icon
              name="sunny"
              size={24}
              color={theme.colors.text}
              onPress={toggleTheme}
            />
          )}
        </Right>
      ) : (
        <Right />
      )}
    </Container>
  );
};

export default Header;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  padding-horizontal: 10px;
`;

const Left = styled.View`
  width: 50px;
  justify-content: center;
  align-items: flex-start;
`;

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Right = styled.View`
  width: 50px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;
