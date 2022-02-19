import axios from 'axios';
import { IMonthStatData, IStatisticsRequestData, LongStatData } from '../models/StatisticsModel';
import { API_URL } from './AppService';
import { getCurrentToken, getCurrentUserId, isAuthenticated } from './AuthService';
import { createUpdateUserWordById, Difficulty, Game, getUserWordById, Known, UserOptionsFields } from './UserWordsService';
const currentDate = new Date();
const month: string = currentDate.toLocaleString('default', { month: 'short' });
const day: number = currentDate.getDate();

export const initialStatData: LongStatData = {
  learnedWords: 0,
  optional: {
    lastLoginDate: Date.now(),
    creationDate: Date.now(),
  },
};
const initialMonthData = {
  newSprint: [...Array(31)].map((x) => 0),
  posSprint: [...Array(31)].map((x) => 0),
  seriaSprint: [...Array(31)].map((x) => 0),
  newAudio: [...Array(31)].map((x) => 0),
  posAudio: [...Array(31)].map((x) => 0),
  seriaAudio: [...Array(31)].map((x) => 0),
  newTotal: [...Array(31)].map((x) => 0),
  knownTotal: [...Array(31)].map((x) => 0),
  positiveTotal: [...Array(31)].map((x) => 0),
};

export const setUserStatistics = async (stats: LongStatData) => {
  const id = getCurrentUserId();
  const token = getCurrentToken();
  const body = {
    learnedWords: stats.learnedWords,
    optional: stats.optional,
  };

  const data = await axios.put(`${API_URL}users/${id}/statistics`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return data.data;
};

export const getUserStatistics = async (): Promise<LongStatData | null> => {
  const id = getCurrentUserId();
  const token = getCurrentToken();
  try {
    const data = await axios.get(`${API_URL}users/${id}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return data.data;
  } catch (error) {
    return null;
  }
};

export const setInitialUserStatistics = async () => {
  const id = getCurrentUserId();
  const token = getCurrentToken();
  initialStatData.optional[month] = initialMonthData;
  const body = JSON.stringify(initialStatData);
  const res = await axios.put(`${API_URL}users/${id}/statistics`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const updateLearnedWordsCount = async (isLearned: boolean) => {
  const existingStat = await getUserStatistics();
  console.log(existingStat);
  if (existingStat) {
    const body = existingStat;
    body.learnedWords = isLearned ? existingStat.learnedWords + 1 : existingStat.learnedWords - 1;
    if (!body.optional[month]) {
      body.optional[month] = initialMonthData;
    }
    const temp = body.optional[month] as IMonthStatData;
    temp.knownTotal[day] = isLearned ? temp.knownTotal[day] + 1 : temp.knownTotal[day] - 1;
    setUserStatistics(body);
  }
};

export const setUserLoginStatistics = async (stat: LongStatData) => {
  stat.optional.lastLoginDate = Date.now();
  if (isAuthenticated()) {
    return setUserStatistics(stat);
  }
};

export const registerWordGameResult = async (game: Game, wordId: string, result: boolean) => {
  const word = await getUserWordById(wordId);
  if (word) {
    const isDifficult = word.difficulty === Difficulty.Hard;
    const attemptsInRow = word.optional.attempts ? +word.optional.attempts : 0;
    const positiveRes = game === Game.Sprint ? word.optional.sprintPositive : word.optional.audioPositive;
    const negativeRes = game === Game.Sprint ? word.optional.sprintNegative : word.optional.audioNegative;
    // set known=false when result is false
    if (result) {
      if (isDifficult && attemptsInRow === 4) {
        createUpdateUserWordById(wordId, { attempts: 0, [`${UserOptionsFields.IsKnown}`]: Known.True });
      }
      if (!isDifficult && attemptsInRow === 2) {
        createUpdateUserWordById(wordId, { attempts: 0, [`${UserOptionsFields.IsKnown}`]: Known.True });
      }
    } else {
      createUpdateUserWordById(wordId, { attempts: 0, [`${UserOptionsFields.IsKnown}`]: Known.False });
    }
    if (game === Game.Sprint) {
      createUpdateUserWordById(
        wordId,
        result
          ? { attempts: attemptsInRow + 1, sprintPositive: positiveRes ? positiveRes + 1 : 1 }
          : { sprintNegative: negativeRes ? negativeRes + 1 : 1 }
      );
    } else {
      createUpdateUserWordById(
        wordId,
        result
          ? { attempts: attemptsInRow + 1, audioPositive: positiveRes ? positiveRes + 1 : 1 }
          : { audioNegative: negativeRes ? negativeRes + 1 : 1 }
      );
    }
  }
};
