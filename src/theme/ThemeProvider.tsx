import { createContext, useContext, useState } from 'react';
import {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components/native';
import { darkTheme, lightTheme } from './theme';

export type ThemeContextType = {
  theme: DefaultTheme;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * A provider component that wraps a given component with a `ThemeContext.Provider`
 * and a `StyledThemeProvider` from styled-components.
 *
 * @prop {React.ReactNode} children - The component to be wrapped.
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

/**
 * A custom hook to access the current theme context value, which includes the theme object,
 * a boolean indicating if dark mode is active, and a function to toggle the theme.
 *
 * @returns {ThemeContextType} The current theme context value.
 * @throws {Error} If used outside of a ThemeProvider.
 */

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
