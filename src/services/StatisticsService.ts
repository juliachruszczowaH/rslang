import axios from 'axios';
import { IMonthStatData, LongStatData } from '../models/StatisticsModel';
import { UserWordData } from '../models/WordModel';
import { API_URL } from './AppService';
import { getCurrentToken, getCurrentUserId, isAuthenticated } from './AuthService';
import { createUpdateUserWordById, Difficulty, Game, getUserWordById, Known, UserOptionsFields } from './UserWordsService';
const currentDate = new Date();
const month: string = currentDate.toLocaleString('default', { month: 'short' });
const day: number = currentDate.getDate() - 1;
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
  sprintTotal: [...Array(31)].map((x) => 0),
  audioTotal: [...Array(31)].map((x) => 0),
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
    body.learnedWords = isLearned ? existingStat.learnedWords + 1 : existingStat.learnedWords > 0 ? existingStat.learnedWords - 1 : 0;
    if (!body.optional[month]) {
      body.optional[month] = initialMonthData;
    }
    const temp = body.optional[month] as IMonthStatData;
    temp.knownTotal[day] = isLearned ? temp.knownTotal[day] + 1 : temp.knownTotal[day] > 0 ? temp.knownTotal[day] - 1 : 0;
    setUserStatistics(body);
  }
};

export const updateNewWordsCount = (game: Game, count: number, posCount: number, seriaLength: number) => {
  getUserStatistics().then((existingStat) => {
    if (existingStat) {
      const body = existingStat;
      if (!body.optional[month]) {
        body.optional[month] = initialMonthData;
      }
      const temp = body.optional[month] as IMonthStatData;
      if (game === Game.Sprint) {
        temp.newSprint[day] = temp.newSprint[day] + count;
        temp.posSprint[day] = temp.posSprint[day] + posCount;
        temp.seriaSprint[day] = temp.seriaSprint[day] < seriaLength ? seriaLength : temp.seriaSprint[day];
        temp.sprintTotal[day] = temp.sprintTotal[day] + 20;
        temp.newTotal[day] = temp.newTotal[day] + count;
      } else {
        temp.newAudio[day] = temp.newAudio[day] + count;
        temp.posAudio[day] = temp.posAudio[day] + posCount;
        temp.seriaAudio[day] = temp.seriaAudio[day] < seriaLength ? seriaLength : temp.seriaAudio[day];
        temp.audioTotal[day] = temp.audioTotal[day] + 20;
        temp.newTotal[day] = temp.newTotal[day] + count;
      }

      body.optional[month] = temp;
      setUserStatistics(body);
    }
  });

};



export const setUserLoginStatistics = async (stat: LongStatData) => {
  stat.optional.lastLoginDate = Date.now();
  if (isAuthenticated()) {
    return setUserStatistics(stat);
  }
};

const updateWordIsKnown = (
  wordId: string,
  result: boolean,
  isDifficult: boolean,
  attemptsInRow: number
): Promise<UserWordData> | null | undefined => {
  if (result) {
    if ((isDifficult && attemptsInRow === 4) || (!isDifficult && attemptsInRow === 2)) {
      return createUpdateUserWordById(wordId, { [`${UserOptionsFields.IsKnown}`]: Known.True });
    } else {
      return null;
    }
  } else {
    return createUpdateUserWordById(wordId, { attempts: 0, [`${UserOptionsFields.IsKnown}`]: Known.False });
  }
};

const updateWordAttempts = (
  game: Game.Sprint | Game.Audiocall,
  wordId: string,
  result: boolean,
  attemptsInRow: number,
  positiveRes: number,
  negativeRes: number
): Promise<UserWordData> => {
  if (game === Game.Sprint) {
    return createUpdateUserWordById(
      wordId,
      result === true
        ? { attempts: attemptsInRow + 1, sprintPositive: positiveRes ? positiveRes + 1 : 1 }
        : { sprintNegative: negativeRes ? negativeRes + 1 : 1 }
    );
  } else {
    return createUpdateUserWordById(
      wordId,
      result === true
        ? { attempts: attemptsInRow + 1, audioPositive: positiveRes ? positiveRes + 1 : 1 }
        : { audioNegative: negativeRes ? negativeRes + 1 : 1 }
    );
  }
};

export const registerWordGameResult = async (game: Game.Sprint | Game.Audiocall, wordId: string, result: boolean) => {
  if (isAuthenticated()) {
    const word = await getUserWordById(wordId);
    if (word) {
      const isDifficult = word.difficulty === Difficulty.Hard;
      const attemptsInRow = word.optional.attempts ? word.optional.attempts : 0;
      const positiveRes =
        game === Game.Sprint
          ? word.optional.sprintPositive
            ? word.optional.sprintPositive
            : 0
          : word.optional.audioPositive
            ? word.optional.audioPositive
            : 0;
      const negativeRes =
        game === Game.Sprint
          ? word.optional.sprintNegative
            ? word.optional.sprintNegative
            : 0
          : word.optional.audioNegative
            ? word.optional.audioNegative
            : 0;
      // set known=false when result is false

      return updateWordAttempts(game, wordId, result, attemptsInRow, positiveRes, negativeRes).then(() => {

        updateWordIsKnown(wordId, result, isDifficult, attemptsInRow);
      });
    }
  } else {
    return null;
  }
};
