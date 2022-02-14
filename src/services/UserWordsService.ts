import axios from 'axios';
import { IUserWordData, IWordData, UserWordData } from '../models/WordModel';
import { API_URL } from './AppService';

export const getUserWords = async (id: string, token: string): Promise<UserWordData[]> => {
  const data = await axios.get(`${API_URL}users/${id}/words`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(data);
  return data.data;
};

export const setWordIsDiffucult = async (userId: string, token: string, wordId: string, isHard = true): Promise<UserWordData[]> => {
  const body = JSON.stringify({
    difficulty: isHard ? 'hard' : 'light',

  });
  const data = await axios.post(`${API_URL}users/${userId}/words/${wordId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(data);
  return data.data;
};

export const getHardWords = async (id: string, token: string): Promise<IUserWordData[]> => {
  const data = await axios.get(encodeURI(`${API_URL}users/${id}/aggregatedWords`), {
    params: { filter: JSON.stringify({ '$and': [{ 'userWord.difficulty': 'hard' }] }) },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(data);
  return data.data;
};

export const getUserWordById = async (userId: string, wordId: string, token: string): Promise<UserWordData[]> => {
  const data = await axios.get(`${API_URL}users/${userId}/words`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(data);
  return data.data;
};
