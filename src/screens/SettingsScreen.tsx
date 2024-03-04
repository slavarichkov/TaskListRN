import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootState } from '@reduxjs/toolkit/query';

//Контекст
import { useTheme } from '../contexts/theme/ThemeContext';
import { useAuth } from '../contexts/auth/AuthContext';
//Reduce
import { useSelector, useDispatch } from 'react-redux';
import { onLightTheme, onDarkTheme } from '../redux/slices/themeSlice';

import Button from '../components/commonComponents/buttons/Button';
import FormSignUp from '../components/SettingScreen/FormSignUp/FormSignUp';
import FormSignIn from '../components/SettingScreen/FormSignIn/FormSignIn';
import FormUpdateUser from '../components/SettingScreen/FormUpdateUser';
import FormRecoveryPassword from './components/FormRecoveryPassword/FormRecoveryPassword';
import FormLogOut from '../components/SettingScreen/FormLogOut';
import FormRemoveProfile from '../components/SettingScreen/FormRemoveProfile';

import { deleteToken, getToken, saveUserId } from '../utils/secureStoreFunctions';
import apiUser from '../services/apiUser';
import { getDeviceId } from '../utils/asyncStoreFunctions';
import { useSettingsScreenPresenter } from '../presenters/SettingsScreenPresenter';

/** Настройки */
function SettingScreen() {

  const {
    isOpenFormSignUp,
    isOpenFormSignIn,
    isOpenFormUpdateUser,
    isOpenFormSignOut,
    isOpenFormDeleteProfile,
    isOpenFormRecoveryPassword,
    email,
    login,
    isNotification,
    openFormDeleteProfile,
    closeFormDeleteProfile,
    openFormSignOut,
    closeFormSignUp,
    handleSuccessfulRegistration,
    openFormSignUp,
    openFormSignIn,
    openFormUpdateUser,
    closeFormUpdateUser,
    closeFormSignIn,
    handleSuccessfulSignIn,
    openFormRecoveryPassword,
    closeFormRecoveryPassword,
    handleAccessRecoveryPassword,
    closeFormSignOut,
    logOut,
    removeProfile,
  } = useSettingsScreenPresenter();

  const { backgroundColor, colorText, changeTheme } = useTheme();
  const { auth, userData, setUserData, } = useAuth();

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
