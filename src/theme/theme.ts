import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      card: string;
      textSecondary: string;
      accent: string;
      profit: string;
      loss: string;
      divider: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl?: number;
    };
    fontSize: {
      xs: number;
      sm: number;
      base: number;
      md: number;
      lg: number;
      xl: number;
      xxl?: number;
    };
    borderRadius?: {
      sm: number;
      md: number;
      lg: number;
    };
  }
}

const SHARED_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const SHARED_FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

const SHARED_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
};

export const lightTheme: DefaultTheme = {
  colors: {
    background: '#ffffff',
    card: '#f0f0f0',
    text: '#1c1c1c',
    textSecondary: '#666666',
    accent: '#3c82f6',
    profit: '#21ba45',
    loss: '#db2828',
    divider: '#e0e0e0',
  },
  spacing: SHARED_SPACING,
  fontSize: SHARED_FONT_SIZES,
  borderRadius: SHARED_RADIUS,
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: '#0f0f0f',
    card: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#aaaaaa',
    accent: '#3c82f6',
    profit: '#21ba45',
    loss: '#db2828',
    divider: '#2c2c2c',
  },
  spacing: SHARED_SPACING,
  fontSize: SHARED_FONT_SIZES,
  borderRadius: SHARED_RADIUS,
};
