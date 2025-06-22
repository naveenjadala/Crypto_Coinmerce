import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import SafeView from './src/components/SafeView';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/redux/store';
import { ThemeProvider } from './src/theme/ThemeProvider';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <SafeView>
            <AppNavigator />
          </SafeView>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
