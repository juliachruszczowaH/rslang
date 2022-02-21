import axios, { AxiosRequestConfig } from 'axios';
import { ILoginResponseData, IUserCreds } from '../models/UserModel';
import { getStorageData, registerStorageData } from '../utils/utils';
import { API_URL } from './AppService';
import { getUserStatistics, setInitialUserStatistics, setUserStatistics } from './StatisticsService';

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
  const currentDate = new Date();
  const month: string = currentDate.toLocaleString('en-US', { month: 'short' });
  return signIn(user).then((signInResp) => {
    registerStorageData(signInResp);
    result = signInResp;
  }).then(() => {
    getUserStatistics().then(async (response) => {
      if (response) console.log(response.optional[month]);
      result = (response && response.optional[month]) ? await setUserStatistics(response) : await setInitialUserStatistics();
    });
  }).then(() => result);
};

export const getCurrentUserId = (): string | null => {
  return getStorageData('currentId');
};

export const getCurrentToken = (): string | null => {
  return getStorageData('token');
};

export const getCurrentRefreshToken = (): string | null => {
  return getStorageData('refreshToken');
};

export const isAuthenticated = (): boolean => {
  const authState = localStorage.getItem('authState');
  if (authState && authState === 'Authenticated') {
    return true;
  }
  return false;
};
