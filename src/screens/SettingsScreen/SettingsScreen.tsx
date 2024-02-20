import {StyleSheet, Text, View} from 'react-native';

//Контекст

import Button from '../../components/buttons/Button';
import { useTheme } from '../../contexts/theme/ThemeContext';

/** Глобавльные настройки */
function SettingScreen() {
  const {backgroundColor, colorText, changeTheme} = useTheme();

  return (
    <View style={[styles.container, backgroundColor]}>
      {/* Выбор темы
            <View
                style={[styles.containerButtons, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <ButtonSetting text={'Светлая'} onClick={() => changeTheme('light')} />
                <Text style={[styles.textNameButtonContainer, colorText]}>{'тема'}</Text>
                <ButtonSetting text={'Темная'} onClick={() => changeTheme('dark')} />
            </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  containerButtons: {
    marginTop: 20,
    alignItems: 'center',
    width: '90%',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textNameButtonContainer: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(0,0,0,1)',
  },
  containerClientInfo: {
    marginTop: 30,
    alignItems: 'center',
    width: '90%',
    padding: 20,
    borderRadius: 20,
  },
  containerTextClientInfo: {
    color: 'rgba(0,0,0,1)',
    paddingBottom: 20,
    width: '100%',
  },
  text: {
    color: 'rgba(0,0,0,1)',
    fontSize: 17,
  },
  containerAuthBitton: {
    //flexDirection: 'row',
  },
  buttonAuth: {
    marginVertical: 15,
  },
});

export default SettingScreen;
