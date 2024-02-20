import React, {FC, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
//Контекст
import {useTheme} from '../contexts/theme/ThemeContext';
// Изображения
import imgHome from '../assets/images/home-1-svgrepo-com.png';
import imgSettings from '../assets/images/setting-svgrepo-com.png';
// Screens
import TaskListScreen from '../screens/TaskListScreen/TaskListScreen';
import SettingScreen from '../screens/SettingsScreen/SettingsScreen';

/**
 * Главный компонент - точка входа приложения, управляющий навигацией и скринами.
 *
 * @component
 * @returns {React.Component} Главный компонент приложения.
 */
function MainNavigator() {
  const Tab = createBottomTabNavigator();
  const screenWidth = Dimensions.get('window').width;
  const insets = useSafeAreaInsets();
  //Контекст
  const {backgroundColor, theme} = useTheme();

  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);

  const activeTintColor = theme === 'light' ? '#000000' : '#ffffff';
  const tintColor = theme === 'light' ? '#000000' : 'rgba(255, 255, 255,0.5)';

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  interface Props {
    imgSource: string;
  }

  const TabBarIcon: FC<Props> = ({imgSource}) => {
    return (
      <Image
        source={imgSource}
        style={{width: 29, height: 29, tintColor: tintColor}}
      />
    );
  };

  return (
    <View style={[styles.container, backgroundColor]}>
      <Tab.Navigator
        initialRouteName="TaskListScreen" // начальный экран
        screenOptions={{
          tabBarLabel: () => null, // Скрыть название вкладки
          tabBarStyle: {
            backgroundColor: theme === 'light' ? '#d7d7d9' : '#262729',
            opacity: keyboardOpen && Platform.OS === 'android' ? 0 : 1, //
            width: screenWidth, // Ширина на весь экран
            position: 'absolute',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderWidth: 0,
            paddingTop: 10,
            paddingBottom: insets.bottom,
            overflow: 'hidden',
            borderTopWidth: 0, // Устанавливаем толщину верхней границы в 0, чтобы убрать рамку
            elevation: 0, // Устанавливаем тень в 0, чтобы убрать тень (для Android)
          },
          tabBarActiveTintColor: activeTintColor,
        }}>
        <Tab.Screen
          name="TaskListScreen"
          component={TaskListScreen}
          options={{
            tabBarLabel: 'Главная',
            tabBarIcon: ({color}) => <TabBarIcon imgSource={imgHome} />,
            headerShown: false, // Полностью скрыть верхний заголовок экрана
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarLabel: 'Настройки',
            tabBarIcon: ({color}) => <TabBarIcon imgSource={imgSettings}/>,
            headerShown: false, // Полностью скрыть верхний заголовок экрана
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default MainNavigator;
