import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, UIManager } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContextProvider } from './src/contexts/theme/ThemeContext';

import { getSelectedThemeAsyncStore} from './src/utils/asyncStoreFunctions';
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [navigatorTheme, setNavigatorTheme] = useState<any>(DefaultTheme);

  useEffect(() => {
    let currentNavigatorTheme = DefaultTheme;
    if (theme === 'dark') {
      setTheme('dark');
      currentNavigatorTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#333b42',
        },
      };
    } else {
      setTheme('light');
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
      <ThemeContextProvider>
        <NavigationContainer theme={navigatorTheme}>
          <StatusBar backgroundColor={theme === 'light' ? 'white' : '#c0c7cf'} barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
          <MainNavigator />
        </NavigationContainer>
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
