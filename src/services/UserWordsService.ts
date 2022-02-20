import axios from 'axios';
import { IUserWordData, IWordData, UserWordData } from '../models/WordModel';
import { API_URL } from './AppService';

const initialUserWord = {
  difficulty: 'normal',
  optional: {
    isNew: false,
    isKnown: false,
  },
};

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

export const createUserWord = async (userId: string, token: string, wordId: string, wordData: UserWordData) => {
  const data = await axios.post(`${API_URL}users/${userId}/words/${wordId}`, wordData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(data);
  return data.data;
};

export const getUserWordById = async (userId: string, token: string, wordId: string) => {
  try {
    const data = await axios.get(`${API_URL}users/${userId}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
    return data.data;
  } catch (error) {
    return null;
  }
};

export const updateUserWordById = async (userId: string, token: string, wordId: string, wordData: UserWordData) => {


  const data = await axios.put(`${API_URL}users/${userId}/words/${wordId}`, wordData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(data);
  return data.data;

};

export const createUpdateUserWordById = async (userId: string, token: string, wordId: string, wordData: UserWordData) => {
  const word = await getUserWordById(userId, token, wordId);
  if (word) {

    return updateUserWordById(userId, token, wordId, wordData);

  } else {
    return createUserWord(userId, token, wordId, wordData);
  }

};

export const setWordToHard = async (userId: string, token: string, wordId: string, isHard = true): Promise<UserWordData[]> => {
  const body = JSON.stringify({
    difficulty: isHard ? 'hard' : 'normal',
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
  const data = await axios.get(encodeURI(`${API_URL}users/${id}/aggregatedWords?group=&page=&wordsPerPage=${600}`), {
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

export const getPaginatedAllUserAggregatedWords = async (id: string, token: string, group: number, page: number, wordsPerPage = 20): Promise<IUserWordData[]> => {
  const data = await axios.get(encodeURI(`${API_URL}users/${id}/aggregatedWords?wordsPerPage=${wordsPerPage}`), {
    params: { filter: JSON.stringify({ '$and': [{ 'group': group, 'page': page }] }) },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(data);
  return data.data;
};

