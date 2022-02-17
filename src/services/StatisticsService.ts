import axios from 'axios';
import { IStatisticsRequestData, IStatOptions } from '../models/StatisticsModel';
import { getStorageData } from '../utils/utils';
import { API_URL } from './AppService';

const initialStat = {
  learnedWords: 0,
  optional: {
    creationDate: Date.now(),
    lastLoginDate: 0,
  },
};

export const setUserStatistics = async (id: string, token: string, stats: IStatisticsRequestData) => {
  const body = JSON.stringify(stats);
  console.log(stats);
  await axios.put(`${API_URL}users/${id}/statistics`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(body);
  return body;
};

export const getUserStatistics = async (id: string, token: string) => {
  try {
    const data = await axios.get(`${API_URL}users/${id}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (error) {

    return null;
  }
};




export const setUserOptionalLoginStatistics = async (id: string, token: string, value: number) => {
  const existingStat = await getUserStatistics(id, token);
  if (existingStat?.data) {
    console.log(value);
    const tempStat = { learnedWords: existingStat.data.learnedWords, optional: existingStat.data.optional };
    tempStat.optional.lastLoginDate = value;
    return setUserStatistics(id, token, tempStat);
  }
};
