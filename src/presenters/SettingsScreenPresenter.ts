import { useEffect, useState } from 'react';
import { getDeviceId } from '../utils/asyncStoreFunctions';
import { deleteToken, getToken, saveUserId } from '../utils/secureStoreFunctions';
import apiUser from '../services/apiUser';
import { useAuth } from '../contexts/auth/AuthContext';
import { useTheme } from '@react-navigation/native';

export const useSettingsScreenPresenter = () => {
  const { backgroundColor, colorText, changeTheme } = useTheme();
  const { auth, userData, setUserData, } = useAuth();
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

  return {
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
  };
};
