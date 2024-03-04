import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import {
  saveSelectedThemeAsyncStore,
  getSelectedThemeAsyncStore,
} from '../../utils/asyncStoreFunctions';

/**
 * Контекст для работы с темой.
 *
 */
const ThemeContext = createContext();

/**
 * Поставщик контекста для управления темой приложения и цветом текста, а также цветом модального окна
 *
 * @component
 * @example
 * // Пример использования в приложении:
 * <ThemeContextProvider>
 *   <App />
 * </ThemeContextProvider>
 *
 * @param {object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние компоненты, обертываемые ThemeContextProvider.
 * @returns {React.ReactNode} Компонент ThemeContextProvider.
 */
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');
  const [colorText, setColorText] = useState({ color: '#ffffff' });
  const [colorTextModal, setColorTextModal] = useState({ color: '#000000' });
  const [backgroundColor, setBackgroundColor] = useState({
    backgroundColor: '#c1c7cf',
  });

  async function changeTheme(theme: 'light' | 'dark') {
    if (theme === 'light' || theme === 'dark') {
      await saveSelectedThemeAsyncStore(theme);
      setTheme(theme);
      controlBackgrondColorTextColor(theme);
    }
  }

  function controlBackgrondColorTextColor(theme: string) {
    if (theme === 'light') {
      setBackgroundColor({ backgroundColor: '#c1c7cf' });
      setColorText({ color: 'rgba(0,0,0,1)' });
    } else if (theme === 'dark') {
      setBackgroundColor({ backgroundColor: '#333b42' }); // 292828
      setColorText({ color: 'rgba(255,255,255,1)' });
    }
  }

  async function getTheme() {
    const theme = await getSelectedThemeAsyncStore();
    controlBackgrondColorTextColor(theme);
    setTheme(theme);
  }

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, colorText, colorTextModal, backgroundColor, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
