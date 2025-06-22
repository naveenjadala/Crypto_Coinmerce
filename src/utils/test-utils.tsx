import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from '../theme/ThemeProvider';

/**
 * A utility function for rendering a given React element with a ThemeProvider.
 * It is needed because render function from @testing-library/react-native does not
 * support rendering with a custom provider out of the box.
 *
 * @param ui - The React element to be rendered.
 * @returns The result of the testing library render function.
 */
export const customRender = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};
