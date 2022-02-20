import axios, { AxiosRequestConfig } from 'axios';
import { ILoginResponseData, IUserCreds } from '../models/UserModel';
import { getStorageData } from '../utils/utils';
import { API_URL } from './AppService';
import { getUserStatistics, setUserStatistics } from './StatisticsService';

const initialStat = {
  learnedWords: 0,
  optional: {
    creationDate: Date.now(),
    lastLoginDate: Date.now(),
  },
};

export const logout = () => {
  localStorage.clear();
};

export const signIn = async (user: IUserCreds): Promise<ILoginResponseData> => {
  const body = JSON.stringify(user);
  const options: AxiosRequestConfig = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const data = await axios.post(`${API_URL}signin`, body, options);
  return data.data;
};

export const login = async (user: IUserCreds): Promise<ILoginResponseData> => {
  let result: ILoginResponseData;
  return signIn(user).then((signInResp) => {
    localStorage.setItem('token', signInResp.token);
    localStorage.setItem('currentId', signInResp.userId);
    localStorage.setItem('currentName', signInResp.name);
    localStorage.setItem('refreshToken', signInResp.refreshToken);
    localStorage.setItem('authState', signInResp.message);
    result = signInResp;
  }).then(() => {
    getUserStatistics(result.userId, result.token).then(async (response) => {
      if (response === null) {
        setUserStatistics(result.userId, result.token, initialStat);
      }
    });
  }).then(() => result);


};

export const getCurrentUserId = (): string | null => {
  return getStorageData('currentId');
};

export const getCurrentToken = (): string | null => {
  return getStorageData('token');
};

export const isAuthenticated = (): boolean => {
  const authState = localStorage.getItem('authState');
  if (authState && authState === 'Authenticated') {
    return true;
  }
  return false;
};
