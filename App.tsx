import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, UIManager } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ThemeContextProvider,
  useTheme,
} from './src/contexts/theme/ThemeContext';
import { AuthContextProvider } from './src/contexts/auth/AuthContext';
import store from './src/redux/store';
import { Provider } from 'react-redux';

import { getSelectedThemeAsyncStore } from './src/utils/asyncStoreFunctions';
import MainNavigator from './src/navigators/MainNavigator';

// Включение поддержки анимации макета на Android, которая позволяет использовать LayoutAnimation для создания анимаций  компонентов при изменении их размеров и расположения. Однако по умолчанию эта функция отключена.
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App(): React.JSX.Element {
  //Получить тему
  const [theme, setTheme] = useState('light');
  const [navigatorTheme, setNavigatorTheme] = useState<any>(DefaultTheme);

  useEffect(() => {
    getSelectedThemeAsyncStore().then(theme => setTheme(theme));
  }, []);

  useEffect(() => {
    let currentNavigatorTheme = DefaultTheme;
    if (theme === 'dark') {
      currentNavigatorTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#333b42',
        },
      };
    } else {
      currentNavigatorTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#c0c7cf',
        },
      };
    }
    setNavigatorTheme(currentNavigatorTheme);
  }, [theme]);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeContextProvider>
          <AuthContextProvider>
            <NavigationContainer theme={navigatorTheme}>
              <StatusBar
                backgroundColor={theme === 'light' ? '#c0c7cf' : '#333b42'}
                barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
              />
              <MainNavigator />
            </NavigationContainer>
          </AuthContextProvider>
        </ThemeContextProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
