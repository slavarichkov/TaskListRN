import React, { createContext, useEffect, useState, useContext } from 'react';
import { getToken, getUserId, saveUserId } from '../../utils/secureStoreFunctions';
import { generateAndSaveDeviceId, getDeviceId } from '../../utils/asyncStoreFunctions';
import apiUser from '../../services/apiUser';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Пользователь
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState({}); // объект данных о юзере
  const [handleChangeUserData, setHandleChangeUserData] = useState(false); // слушатель изменений для перерисовки
  // Лоадеры
  const [statusAuthLoading, setStatusAuthLoading] = useState<'starting' | 'completed'>('starting');

  async function getAuth() {
    try {
      setStatusAuthLoading('starting');
      const token = await getToken();
      let idUser = await getUserId();
      console.log(`idUser ${idUser}`);
      if (!idUser) {
        await saveUserId('userId');
        idUser = 'userId';
      }
      await generateAndSaveDeviceId();
      const deviceId = await getDeviceId();
      // Получить данные о пользователе и проверить авторизацию
      const userData = await apiUser.getSelfUser(token, deviceId);
      setUserData(userData.user);
      setAuth(true);
      setStatusAuthLoading('completed');
    } catch (err) {
      setStatusAuthLoading('completed');
      console.log(err);
      setAuth(false);
    }
  }

  useEffect(() => {
    getAuth();
  }, [handleChangeUserData]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        handleChangeUserData,
        setHandleChangeUserData,
        userData,
        setUserData,
        statusAuthLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
