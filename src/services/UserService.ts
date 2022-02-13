import axios, { AxiosRequestConfig } from 'axios';
import { IUserRequestData } from '../models/UserModel';
import { API_URL } from './AppService';

export const createNewUser = async (userData: IUserRequestData) => {
  const body = JSON.stringify(userData);
  const options: AxiosRequestConfig = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const data = await axios.post(`${API_URL}users`, body, options);
  console.log(data);
  return data;
};

