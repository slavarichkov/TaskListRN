import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootState } from '@reduxjs/toolkit/query';

//Контекст
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useAuth } from '../../contexts/auth/AuthContext';
//Reduce
import { useSelector, useDispatch } from 'react-redux';
import { onLightTheme, onDarkTheme } from '../../redux/slices/themeSlice';

import Button from '../../commonComponents/buttons/Button';
import { deleteToken, getToken, saveUserId } from '../../utils/secureStoreFunctions';
import apiUser from '../../services/apiUser';
import { getDeviceId } from '../../utils/asyncStoreFunctions';
import FormSignUp from './components/FormSignUp/FormSignUp';
import FormSignIn from './components/FormSignIn/FormSignIn';
import FormUpdateUser from './components/FormUpdateUser';
import FormRecoveryPassword from './components/FormRecoveryPassword/FormRecoveryPassword';
import FormLogOut from './components/FormLogOut';
import FormRemoveProfile from './components/FormRemoveProfile';

/** Настройки */
function SettingScreen() {

  const { backgroundColor, colorText, changeTheme } = useTheme();
  const { auth, userData, setUserData,  } = useAuth();
  //const count = useSelector((state: RootState) => state.theme.value);
  //const dispatch = useDispatch();

  const [isOpenFormSignUp, setIsOpenFormSignUp] = useState(false);
  const [isOpenFormSignIn, setIsOpenFormSignIn] = useState(false);
  const [isOpenFormUpdateUser, setIsOpenFormUpdateUser] = useState(false);
  const [isOpenFormSignOut, setIsOpenFormSignOut] = useState(false);
  const [isOpenFormDeleteProfile, setIsOpenFormDeleteProfile] = useState(false);
  const [isOpenFormRecoveryPassword, setIsOpenFormRecoveryPassword] = useState(false);
  // Данные профиля
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [isNotification, setIsNotification] = useState(false);

  function openFormDeleteProfile() {
    setIsOpenFormDeleteProfile(true);
  }

  function closeFormDeleteProfile() {
    setIsOpenFormDeleteProfile(false);
  }

  function openFormSignOut() {
    setIsOpenFormSignOut(true);
  }

  function closeFormSignUp() {
    setIsOpenFormSignUp(false);
  }

  function handleSuccessfulRegistration() {
    setUserData(undefined);
    closeFormSignUp();
  }

  function openFormSignUp() {
    setIsOpenFormSignUp(true);
  }

  function openFormSignIn() {
    setIsOpenFormSignIn(true);
  }

  function openFormUpdateUser() {
    setIsOpenFormUpdateUser(true);
  }

  function closeFormUpdateUser() {
    setIsOpenFormUpdateUser(false);
  }

  function closeFormSignIn() {
    setIsOpenFormSignIn(false);
  }

  function handleSuccessfulSignIn() {
    closeFormSignIn();
  }

  function openFormRecoveryPassword() {
    setIsOpenFormRecoveryPassword(true);
    setIsOpenFormSignIn(false);
  }

  function closeFormRecoveryPassword() {
    setIsOpenFormRecoveryPassword(false);
  }

  function handleAccessRecoveryPassword() {

  }

  function closeFormSignOut() {
    setIsOpenFormSignOut(false);
  }

  async function logOut() {
    const token = await getToken();
    const idDevice = await getDeviceId();
    await apiUser.logOut(idDevice, token);
    await deleteToken();
    await saveUserId('userId');
    closeFormSignOut();
    setUserData(undefined);
  }

  async function removeProfile(password: string) {

    try {
      const token = await getToken();
      const idDevice = await getDeviceId();

      apiUser.removeProfile(token, password, idDevice);
      await deleteToken();
      await saveUserId('userId');
      closeFormSignOut();
      setUserData(undefined);
    }
    catch (err) {
      console.log(err)
    }

  }


  useEffect(() => {
    console.log("userData", userData.email)
    if (auth && userData) {
      console.log("userData")
      const userEmail = userData.email;
      setEmail(userEmail);
      const userLogin = userData.login;
      setLogin(userLogin);
    }
  }, [userData, auth])

  return (
    <View style={[styles.container, backgroundColor]}>
      <View
        style={[
          styles.containerClientInfo,
          { backgroundColor: 'rgba(0,0,0,0.3)' },
        ]}>
        {auth ? (
          <>
            <View style={styles.containerTextClientInfo}>
              <Text style={[styles.text, colorText]}>
                email:{' '}
                {email ? email : ''}
              </Text>
              <Text style={[styles.text, colorText]}>login: {login}</Text>
            </View>
            <Button text={'Редактировать'} onClick={openFormUpdateUser} />
          </>
        ) : (
          <View style={styles.containerAuthBitton}>
            <View style={styles.buttonAuth}>
              <Button
                text={'Регистрация'}
                onClick={openFormSignUp}
              />
            </View>
            <Button
              text={'Войти'}
              onClick={openFormSignIn}
            />
          </View>
        )}
      </View>
      <View
        style={[styles.containerButtons, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
        <Button
          text={'Светлая'}
          onClick={() => {
            //dispatch(onLightTheme());
            changeTheme('light');
          }}
        />
        <Text style={[styles.textNameButtonContainer, colorText]}>
          {'тема'}
        </Text>
        <Button
          text={'Темная'}
          onClick={() => {
            //dispatch(onDarkTheme());
            changeTheme('dark');
          }}
        />
      </View>
      {isOpenFormSignUp ?
        <FormSignUp
          handleSubmit={handleSuccessfulRegistration}
          visible={isOpenFormSignUp}
          onClose={closeFormSignUp}
        />
        : <></>}
      {isOpenFormSignIn ?
        <FormSignIn
          visible={isOpenFormSignIn}
          handleSubmit={handleSuccessfulSignIn}
          onClose={closeFormSignIn}
          openRecoveryPassword={openFormRecoveryPassword}
        />
        : <></>}
       {/*{isOpenFormUpdateUser ?
        <FormUpdateUser
          visible={isOpenFormUpdateUser}
          closeForm={closeFormUpdateUser}
          userAppLogin={login}
        />
        : <></>}
      {isOpenFormRecoveryPassword ?
        <FormRecoveryPassword
          visible={isOpenFormRecoveryPassword}
          onClose={closeFormRecoveryPassword}
          handleSubmit={handleAccessRecoveryPassword}
        />
        : <></>}
      {isOpenFormSignOut ?
        <FormLogOut
          isOpenFormSignOut={isOpenFormSignOut}
          closeFormSignOut={closeFormSignOut}
          logOut={logOut}
        />
        : <></>}
      {isOpenFormDeleteProfile ?
        <FormRemoveProfile
          loading={false}
          isOpenFormDeleteProfile={isOpenFormDeleteProfile}
          closeFormDeleteProfile={closeFormDeleteProfile}
          deleteProfile={removeProfile}
        />
        : <></>} */}
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
  },
  textNameButtonContainer: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(0,0,0,1)',
    paddingVertical: 17,
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
    paddingVertical: 17,
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
