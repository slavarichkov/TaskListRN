import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

/**  Генерировать уникальный deviceId и сохранить его в asyncStorage */
const generateAndSaveDeviceId = async () => {
  try {
    // Попытка получения существующего deviceId из asyncStorage
    const existingDeviceId = await AsyncStorage.getItem('deviceId');

    if (existingDeviceId) {
      // Если deviceId уже существует, вернуть его
      return existingDeviceId;
    } else {
      // Если deviceId не существует, сгенерировать новый и сохранить в asyncStorage
      const newDeviceId = uuidv4(); // Генерировать новый уникальный deviceId
      await AsyncStorage.setItem('deviceId', newDeviceId); // Сохранить в asyncStorage
      return newDeviceId; // Вернуть новый deviceId
    }
  } catch (error) {
    // Обработка ошибки при сохранении или получении данных из asyncStorage
    console.error('Ошибка при работе с asyncStorage:', error);
    return null; // Вернуть null в случае ошибки
  }
};

/** Получить deviceId из asyncStorage */
const getDeviceId = async () => {
  try {
    let deviceId = await AsyncStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = await generateAndSaveDeviceId();
    }
    return deviceId;
  } catch (error) {
    // Обработка ошибки при получении данных из asyncStorage
    console.error('Ошибка при получении deviceId из asyncStorage:', error);
    return null; // Вернуть null в случае ошибки
  }
};

/**  Функция для сохранения текущей темы */
const saveSelectedThemeAsyncStore = async (theme: string) => {
  try {
    await AsyncStorage.setItem('selected_theme', theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

/**  Функция для получения текущей темы */
const getSelectedThemeAsyncStore = async (): Promise<
  'light' | 'dark' | string
> => {
  try {
    let theme = await AsyncStorage.getItem('selected_theme');
    let currentDeviceTheme = Appearance.getColorScheme();

    // Если запись отсутствует, создаем её
    if (theme === null) {
      if (currentDeviceTheme === 'dark') {
        await AsyncStorage.setItem('selected_theme', 'dark');
        theme = 'dark';
      } else {
        await AsyncStorage.setItem('selected_theme', 'light');
        theme = 'light';
      }
    }
    return theme;
  } catch (error) {
    console.error('Error getting theme:', error);
    return 'dark';
  }
};

export {
  saveSelectedThemeAsyncStore,
  getSelectedThemeAsyncStore,
  generateAndSaveDeviceId, // Генерировать уникальный deviceId и сохранить его в asyncStorage
  getDeviceId, // Получить deviceId из asyncStorage,
};
